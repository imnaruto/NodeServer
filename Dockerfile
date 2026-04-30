# Uses Node.js 18 on Alpine linux as the base image.
FROM node:18-alpine  

# creates and sets /app as the working directory inside the container. All the subsequent commands run from here
WORKDIR /app 

# Copies package.json and package-lock.json (if it exists) into container first. This is done separately so that the Docker can cache the dependency install step.
COPY package*.json ./ 

# Install all the dependencies listed in package.json. This layer is cached - Docker re-runs it if package.json. 
RUN npm install 

# copy rest of your project files like index.js, style.css in container
COPY . . 

# Documents that the app listens on port 8080
EXPOSE 8080 

# The command that runs when the container starts.  package.json has start script then you can also use CMD ["npm", "start"] instead. 
CMD ["node", "index.js"] 