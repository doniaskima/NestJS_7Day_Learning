# NestJS Microservices with gRPC

gRPC is a modern, open source, high-performance RPC framework that can run in any environment. It efficiently connects services in and across data centers with pluggable support for load balancing, tracing, health checking, and authentication.

This repository demonstrates integrating NestJS with gRPC for building microservices.

## Installation

To start building gRPC-based microservices, first install the required packages:

```bash
$ npm i --save @grpc/grpc-js @grpc/proto-loader
```

## Overview
Like other Nest microservices transport layer implementations, you can select the gRPC transporter mechanism using the transport property of the options object passed to the createMicroservice() method.

```typescript
const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  transport: Transport.GRPC,
  options: {
    package: 'hero',
    protoPath: join(__dirname, 'hero/hero.proto'),
  },
});


```

## Options

The gRPC transporter options object exposes the following properties:

package: Protobuf package name (matches package setting from .proto file). Required
protoPath: Absolute (or relative to the root dir) path to the .proto file. Required
url: Connection URL. String in the format ip address/dns name:port (e.g., 'localhost:50051'). Defines the address/port on which the transporter establishes a connection. Optional. Defaults to 'localhost:5000'
protoLoader: NPM package name for the utility to load .proto files. Optional. Defaults to '@grpc/proto-loader'
loader: @grpc/proto-loader options. Provides detailed control over the behavior of .proto files. Optional.
credentials: Server credentials. Optional.

## Sample gRPC service

Let's define a sample gRPC service called HeroesService:

```typescript
// hero/hero.proto
syntax = "proto3";

package hero;

service HeroesService {
  rpc FindOne (HeroById) returns (Hero) {}
}

message HeroById {
  int32 id = 1;
}

message Hero {
  int32 id = 1;
  string name = 2;
}


```

# gRPC vs. HTTP Comparison

## Overview

This README provides a comparison between gRPC (gRPC Remote Procedure Calls) and HTTP (HyperText Transfer Protocol) in terms of communication protocol, payload format, service definition, streaming support, and performance.

## gRPC

gRPC is an open-source framework developed by Google for efficient and robust communication between distributed systems. Here are the key differences compared to HTTP:

1. **Communication Protocol:**
   - gRPC uses HTTP/2 as the default transport protocol, providing features like multiplexing, flow control, header compression, and support for bi-directional streaming.
   - HTTP is typically associated with HTTP/1.1, although modern applications may use HTTP/2 or newer versions. HTTP/1.1 lacks features like multiplexing and efficient header compression.

2. **Payload Format:**
   - gRPC messages use Protocol Buffers (Protobuf) as the default serialization format. Protocol Buffers are a language-agnostic, efficient, and extensible method for serializing structured data.
   - HTTP can support various payload formats, including JSON, XML, HTML, and others. JSON is a commonly used format for data interchange in HTTP-based APIs.

3. **Service Definition:**
   - gRPC allows you to define services and their methods using Protocol Buffers Interface Definition Language (IDL). The service definition includes message types, method signatures, and error handling.
   - HTTP APIs often define their endpoints using a combination of HTTP methods (GET, POST, PUT, DELETE, etc.) and URL paths.

4. **Support for Streaming:**
   - gRPC supports bidirectional streaming, allowing both the client and server to send a stream of messages to each other. This is useful for real-time communication and data synchronization.
   - While HTTP supports one-directional streaming, it typically involves long polling or WebSockets for bidirectional communication.

5. **Performance and Efficiency:**
   - gRPC is designed to be highly efficient and optimized for performance. It takes advantage of features like multiplexing, binary serialization (Protocol Buffers), and binary framing (HTTP/2) for faster communication.
   - HTTP can be less efficient due to its textual nature (especially in HTTP/1.1), larger header sizes, and lack of built-in support for multiplexing.

## Conclusion

The choice between gRPC and HTTP depends on the specific requirements of your application, including performance, payload format, and the need for bidirectional streaming. Consider the advantages and characteristics of each when designing your communication architecture.

For more information about gRPC, visit the [gRPC official website](https://grpc.io/).
