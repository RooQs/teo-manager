import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { teo } from "tencentcloud-sdk-nodejs-teo";
import {
  DescribeL7AccRulesResponse,
  ModifyL7AccRuleRequest,
} from "tencentcloud-sdk-nodejs-teo/tencentcloud/services/teo/v20220901/teo_models";
import { Client } from "tencentcloud-sdk-nodejs-teo/tencentcloud/services/teo/v20220901/teo_client";

@Injectable()
export class TeoService {
  constructor(private configService: ConfigService) {}

  /**
   * 获取当前空间下所有的访问规则
   * @returns 访问规则列表
   */
  async getAccessRules(zoneId: string): Promise<DescribeL7AccRulesResponse> {
    return await this.getClient().DescribeL7AccRules({
      ZoneId: zoneId,
    });
  }

  async updateAccessRule(ruleData: ModifyL7AccRuleRequest) {
    return await this.getClient().ModifyL7AccRule(ruleData);
  }

  private getClient(): Client {
    return new teo.v20220901.Client({
      credential: {
        secretId: this.configService.get<string>("TEO_SECRET_ID"),
        secretKey: this.configService.get<string>("TEO_SECRET_KEY"),
      },
      region: this.configService.get<string>("TEO_REGION"),
    });
  }
}
