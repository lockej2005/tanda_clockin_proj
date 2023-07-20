# Use PHP 7.4 with Apache
FROM php:7.4-apache

# Install SQLite
RUN apt-get update && \
    apt-get install -y sqlite3 libsqlite3-dev && \
    docker-php-ext-install pdo pdo_sqlite && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Copy source files
COPY . /var/www/html/

# Change the ownership of the files to www-data (Apache web server user)
RUN chown -R www-data:www-data /var/www/html

# Expose port 80
EXPOSE 80
