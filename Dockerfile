FROM node

WORKDIR /app

# Fetch the dependancies
COPY ./package.json /app/package.json
RUN npm install

# Grab the args
ARG GOOGLE_CLIENT_ID
ARG API_ROOT
ARG NODE_ENV=production

# Copy in source, this wont copy node_modules because its in the .dockerignore
COPY ./ /app
RUN GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID API_ROOT=$API_ROOT npm run build

CMD npm start
