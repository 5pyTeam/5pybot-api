#    Copyright (C) 2021  Zbinden Yohan
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with this program.  If not, see <https://www.gnu.org/licenses/>.
FROM node:current-alpine3.11 AS build
WORKDIR /build
COPY ./ /build
RUN yarn install
RUN yarn build
RUN cp package.json ./dist/

FROM node:current-alpine3.11 AS run
ARG PORT=3000
EXPOSE $PORT
WORKDIR /APP
COPY --from=build /build/dist /APP/
RUN yarn install --production
CMD ["node","main.js"]