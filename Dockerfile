FROM node:20
WORKDIR /onebyte
COPY package.json package-lock.json ./
RUN npm install
# RUN npx prisma generate
COPY . .
EXPOSE 4000
CMD ["npm", "run", "production"]
