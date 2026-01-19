import { Module } from "@nestjs/common";
import { TeoService } from "./services/teo.service";

@Module({
  providers: [TeoService],
  exports: [TeoService],
})
export class ApplicationModule {}
