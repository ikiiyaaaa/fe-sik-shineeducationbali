#!/bin/bash

# Script untuk menjalankan project Docker SIK-SEB
# Usage: ./run-docker.sh [dev|prod|stop|clean]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker tidak berjalan. Silakan jalankan Docker Desktop terlebih dahulu."
        exit 1
    fi
}

# Function to run development environment
run_dev() {
    print_status "Menjalankan environment development..."
    check_docker
    
    # Stop any existing containers
    docker-compose -f docker-compose.dev.yml down 2>/dev/null || true
    
    # Build and start development containers
    docker-compose -f docker-compose.dev.yml up --build -d
    
    print_success "Development environment berhasil dijalankan!"
    print_status "Aplikasi tersedia di: http://localhost:3000"
    print_status "Untuk melihat logs: docker-compose -f docker-compose.dev.yml logs -f"
    print_status "Untuk stop: ./run-docker.sh stop"
}

# Function to run production environment
run_prod() {
    print_status "Menjalankan environment production..."
    check_docker
    
    # Stop any existing containers
    docker-compose down 2>/dev/null || true
    
    # Build and start production containers
    docker-compose up --build -d
    
    print_success "Production environment berhasil dijalankan!"
    print_status "Aplikasi tersedia di: http://localhost:3000"
    print_status "Untuk melihat logs: docker-compose logs -f"
    print_status "Untuk stop: ./run-docker.sh stop"
}

# Function to stop all containers
stop_containers() {
    print_status "Menghentikan semua container..."
    
    # Stop development containers
    docker-compose -f docker-compose.dev.yml down 2>/dev/null || true
    
    # Stop production containers
    docker-compose down 2>/dev/null || true
    
    print_success "Semua container telah dihentikan!"
}

# Function to clean up Docker resources
clean_docker() {
    print_status "Membersihkan Docker resources..."
    
    # Stop all containers first
    stop_containers
    
    # Remove unused containers, networks, images, and build cache
    docker system prune -f
    
    print_success "Docker resources telah dibersihkan!"
}

# Function to show help
show_help() {
    echo "Script untuk menjalankan project Docker SIK-SEB"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  dev     Jalankan environment development (default)"
    echo "  prod    Jalankan environment production"
    echo "  stop    Hentikan semua container"
    echo "  clean   Bersihkan Docker resources"
    echo "  help    Tampilkan bantuan ini"
    echo ""
    echo "Examples:"
    echo "  $0          # Jalankan development (default)"
    echo "  $0 dev      # Jalankan development"
    echo "  $0 prod     # Jalankan production"
    echo "  $0 stop     # Hentikan semua container"
    echo "  $0 clean    # Bersihkan Docker resources"
}

# Main script logic
case "${1:-dev}" in
    "dev")
        run_dev
        ;;
    "prod")
        run_prod
        ;;
    "stop")
        stop_containers
        ;;
    "clean")
        clean_docker
        ;;
    "help"|"-h"|"--help")
        show_help
        ;;
    *)
        print_error "Command tidak valid: $1"
        show_help
        exit 1
        ;;
esac
