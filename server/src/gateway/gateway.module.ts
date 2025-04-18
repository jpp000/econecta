import { Module } from "@nestjs/common";
import { MessagesGateway } from "./gateway";

@Module({
  providers: [MessagesGateway]
})
export class GatewayModule { }

