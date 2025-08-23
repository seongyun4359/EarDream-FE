#!/bin/bash

# EarDream Frontend AWS 배포 스크립트
# 사용법: ./deploy.sh

set -e  # 에러 발생 시 즉시 중단

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 로그 함수
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# .env 파일 확인
if [ ! -f .env ]; then
    log_error ".env 파일을 찾을 수 없습니다."
    exit 1
fi

# .env 파일에서 환경 변수 로드
source .env

# 필수 환경 변수 확인
if [ -z "$EC2_HOST" ] || [ -z "$EC2_USER" ] || [ -z "$PEM_KEY" ]; then
    log_error "필수 환경 변수가 설정되지 않았습니다. (EC2_HOST, EC2_USER, PEM_KEY)"
    exit 1
fi

# PEM 키 파일 확인
if [ ! -f "$PEM_KEY" ]; then
    log_error "PEM 키 파일을 찾을 수 없습니다: $PEM_KEY"
    exit 1
fi

# 배포 디렉토리 정의
REMOTE_DIR="/home/$EC2_USER/eardream-fe"
LOCAL_BUILD_DIR="dist"

log_info "AWS EC2 배포를 시작합니다..."
log_info "EC2 Host: $EC2_HOST"
log_info "EC2 User: $EC2_USER"

# 1. 프로젝트 빌드
log_info "프로젝트를 빌드합니다..."
npm run build

if [ ! -d "$LOCAL_BUILD_DIR" ]; then
    log_error "빌드 디렉토리를 찾을 수 없습니다: $LOCAL_BUILD_DIR"
    exit 1
fi

# 2. EC2 서버에 연결 테스트
log_info "EC2 서버 연결을 테스트합니다..."
ssh -o ConnectTimeout=10 -i "$PEM_KEY" "$EC2_USER@$EC2_HOST" "echo 'EC2 연결 성공'" || {
    log_error "EC2 서버에 연결할 수 없습니다."
    exit 1
}

# 3. 원격 디렉토리 생성
log_info "원격 디렉토리를 생성합니다..."
ssh -i "$PEM_KEY" "$EC2_USER@$EC2_HOST" "mkdir -p $REMOTE_DIR"

# 4. 이전 파일 백업 (선택사항)
log_info "이전 버전을 백업합니다..."
ssh -i "$PEM_KEY" "$EC2_USER@$EC2_HOST" << EOF
    if [ -d "$REMOTE_DIR/current" ]; then
        BACKUP_DIR="$REMOTE_DIR/backup_\$(date +%Y%m%d_%H%M%S)"
        mkdir -p \$BACKUP_DIR
        cp -r $REMOTE_DIR/current/* \$BACKUP_DIR/ 2>/dev/null || true
        log_info "백업 완료: \$BACKUP_DIR"
    fi
EOF

# 5. 빌드 파일 업로드
log_info "빌드 파일을 업로드합니다..."
rsync -avz --progress -e "ssh -i $PEM_KEY" \
    "$LOCAL_BUILD_DIR/" \
    "$EC2_USER@$EC2_HOST:$REMOTE_DIR/new/"

# 6. 배포 적용
log_info "새 버전을 배포합니다..."
ssh -i "$PEM_KEY" "$EC2_USER@$EC2_HOST" << EOF
    cd $REMOTE_DIR
    
    # 이전 버전 제거
    if [ -d "current" ]; then
        rm -rf current
    fi
    
    # 새 버전 적용
    mv new current
    
    echo "배포가 완료되었습니다."
EOF

log_info "배포가 성공적으로 완료되었습니다!"
log_info "URL: http://$EC2_HOST"

# 배포 후 헬스 체크 (선택사항)
log_info "배포 상태를 확인합니다..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://$EC2_HOST" 2>/dev/null || echo "000")

if [ "$HTTP_STATUS" = "200" ]; then
    log_info "서비스가 정상적으로 작동 중입니다. (HTTP $HTTP_STATUS)"
else
    log_warn "서비스 응답을 확인할 수 없습니다. (HTTP $HTTP_STATUS)"
    log_warn "웹 서버 설정을 확인하세요."
fi

echo ""
log_info "배포 프로세스가 완료되었습니다."