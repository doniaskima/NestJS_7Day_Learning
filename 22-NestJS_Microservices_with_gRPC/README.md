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