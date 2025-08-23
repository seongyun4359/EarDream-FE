#!/bin/bash

# EarDream Frontend PM2 개발 서버 배포 스크립트
# 사용법: ./deploy-dev-pm2.sh

set -e

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 로그 함수
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

# .env 파일에서 환경 변수 로드
source .env

# 필수 환경 변수 확인
if [ -z "$EC2_HOST" ] || [ -z "$EC2_USER" ] || [ -z "$PEM_KEY" ]; then
    log_error "필수 환경 변수가 설정되지 않았습니다."
    exit 1
fi

REMOTE_DIR="/home/$EC2_USER/eardream-fe"
DEV_PORT=4000

log_info "PM2로 개발 서버를 배포합니다..."
log_info "서버: $EC2_HOST:$DEV_PORT"

# 1. 소스 코드 업로드
log_info "소스 코드를 업로드합니다..."
rsync -avz --progress --delete \
    --exclude 'node_modules' \
    --exclude '.git' \
    --exclude 'dist' \
    --exclude '.env.local' \
    --exclude '*.log' \
    -e "ssh -i $PEM_KEY" \
    ./ "$EC2_USER@$EC2_HOST:$REMOTE_DIR/"

# 2. EC2에서 서버 설정 및 실행
log_info "EC2에서 서버를 설정합니다..."
ssh -i "$PEM_KEY" "$EC2_USER@$EC2_HOST" << 'REMOTE_SCRIPT'
    cd /home/ubuntu/eardream-fe
    
    # Node.js 확인
    if ! command -v node &> /dev/null; then
        echo "Node.js를 설치합니다..."
        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
        sudo apt-get install -y nodejs
    fi
    
    # PM2 확인
    if ! command -v pm2 &> /dev/null; then
        echo "PM2를 설치합니다..."
        sudo npm install -g pm2
    fi
    
    # 기존 PM2 프로세스 중지
    pm2 delete eardream-fe 2>/dev/null || true
    
    # 의존성 설치
    echo "의존성을 설치합니다..."
    npm install
    
    # PM2로 직접 실행 (JSON 파일 없이)
    echo "PM2로 서버를 시작합니다..."
    pm2 start npm --name "eardream-fe" -- run dev -- --host 0.0.0.0
    
    # PM2 상태 확인
    pm2 status
    
    # 자동 시작 설정
    pm2 save
    
    echo "서버가 시작되었습니다."
REMOTE_SCRIPT

# 3. 상태 확인
sleep 5
log_info "서버 상태를 확인합니다..."

HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://$EC2_HOST:$DEV_PORT" 2>/dev/null || echo "000")

if [ "$HTTP_STATUS" = "200" ] || [ "$HTTP_STATUS" = "304" ]; then
    log_info "✅ 서버가 정상 작동 중입니다!"
    log_info "URL: http://$EC2_HOST:$DEV_PORT"
else
    log_warn "서버 응답 확인 실패 (HTTP $HTTP_STATUS)"
    log_info "PM2 로그를 확인하세요:"
    ssh -i "$PEM_KEY" "$EC2_USER@$EC2_HOST" "pm2 logs eardream-fe --lines 10"
fi

echo ""
log_info "유용한 명령어:"
log_info "  로그 확인: ssh -i $PEM_KEY $EC2_USER@$EC2_HOST 'pm2 logs eardream-fe'"
log_info "  서버 재시작: ssh -i $PEM_KEY $EC2_USER@$EC2_HOST 'pm2 restart eardream-fe'"
log_info "  서버 중지: ssh -i $PEM_KEY $EC2_USER@$EC2_HOST 'pm2 stop eardream-fe'"
log_info "  서버 상태: ssh -i $PEM_KEY $EC2_USER@$EC2_HOST 'pm2 status'"