# ✅ Use Playwright's official image with browsers + deps
FROM mcr.microsoft.com/playwright:v1.55.0-noble

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your code
COPY . .

# Expose Railway's port
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
