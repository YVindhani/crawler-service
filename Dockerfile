# ✅ Use Playwright's official image (includes Chromium, WebKit, Firefox + all libs)
FROM mcr.microsoft.com/playwright:v1.41.2-focal

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port Railway will assign
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
