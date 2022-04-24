# Build the Go API
FROM golang:latest AS builder
ADD . /app
WORKDIR /app
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /main-built

# Build the React application
FROM node:alpine AS node_builder
COPY --from=builder /app/client ./
RUN yarn install
RUN yarn build


# Final stage build, this will be the container
# that we will deploy to production
FROM alpine:latest
RUN apk --no-cache add ca-certificates
COPY --from=builder /main-built ./
COPY --from=node_builder /build ./web
RUN chmod +x ./main-built
EXPOSE 8080
CMD ./main-built
