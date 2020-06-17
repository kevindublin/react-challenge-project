FROM node:11

RUN ln -fs /usr/share/zoneinfo/US/Pacific-New /etc/localtime && dpkg-reconfigure -f noninteractive tzdata

WORKDIR /home/server

COPY / ./

RUN ls -al

RUN ["npm", "install", "nodemon", "-g"]

RUN ["npm", "install", "opencollective-postinstall", "--save"]

RUN ["npm", "install", "--no-bin-links", "--no-optional"]

CMD ["npm", "start"]
