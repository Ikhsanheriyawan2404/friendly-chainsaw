# Base image
FROM php:8.1

# Set working directory inside the container
WORKDIR /var/www/html

# Install PostgreSQL client and PHP extension
RUN apt-get update && \
    apt-get install -y libpq-dev && \
    docker-php-ext-install pdo_pgsql

# Enable PDO PostgreSQL extension
RUN docker-php-ext-enable pdo_pgsql

# Copy all PHP files to the working directory
COPY . .

# Expose port 80 (sesuaikan dengan port yang digunakan oleh aplikasi Anda)
EXPOSE 8001

# Command to run the PHP application
CMD [ "php", "-S", "0.0.0.0:8001" ]
