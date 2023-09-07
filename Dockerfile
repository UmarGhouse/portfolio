FROM ruby:2.7-alpine3.14

ENV BUNDLER_VERSION=2.1.4

RUN apk add --update --no-cache \
      curl \
      git \
      less \
      build-base \
      libxml2-dev \
      libxslt-dev \
      shared-mime-info \
      nodejs-current \
      openssl \
      pkgconfig \
      postgresql-dev \
      python2 \
      tzdata \
      yarn 

RUN gem install bundler -v 2.1.4

WORKDIR /usr/app/portfolio

COPY Gemfile Gemfile.lock ./

RUN bundle check || bundle install

COPY package.json yarn.lock ./

RUN yarn install --check-files

COPY . ./

ENTRYPOINT ["./entrypoints/docker-entrypoint.sh"]
