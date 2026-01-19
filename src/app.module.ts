import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HelloController, AccessRuleController } from "./presentation";
import { ApplicationModule } from "./application/application.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    ApplicationModule,
  ],
  controllers: [HelloController, AccessRuleController],
  providers: [],
})
export class AppModule {}
