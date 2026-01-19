import { Controller, Get, Param, Put, Body } from "@nestjs/common";
import { TeoService } from "../../application/services/teo.service";
import { ModifyL7AccRuleRequest } from "tencentcloud-sdk-nodejs-teo/tencentcloud/services/teo/v20220901/teo_models";
@Controller("access_rules")
export class AccessRuleController {
  // 暂时注入 any 类型，后续需替换为实际服务
  constructor(private teoService: TeoService) {}
  @Get("get_rules/:zoneId")
  async getAccessRules(@Param("zoneId") zoneId: string) {
    return await this.teoService.getAccessRules(zoneId);
  }

  @Put("update_source")
  async updateAccessRule(@Body() ruleData: ModifyL7AccRuleRequest) {
    return await this.teoService.updateAccessRule(ruleData);
  }
}
