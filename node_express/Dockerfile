# Base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install


# Copy the rest of the application code
COPY . .

RUN npx prisma generate

# Expose port 82 (sesuaikan dengan port yang digunakan oleh aplikasi Anda)
EXPOSE 8002

# Command to run the application
CMD [ "node", "index.js" ]
