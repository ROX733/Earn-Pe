# Use Node 18
FROM node:18-alpine

# Workdir
WORKDIR /app

# Copy package files first for caching
COPY package.json package-lock.json* ./

# Install deps
RUN npm install --production

# Copy rest of the code
COPY . .

# Render uses PORT 10000 by default
ENV PORT=10000
EXPOSE 10000

# Start
CMD ["npm", "start"]
