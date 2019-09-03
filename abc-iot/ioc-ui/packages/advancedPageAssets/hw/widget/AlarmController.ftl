<div id="AlarmController" v-loading.fullscreen="loading" element-loading-background="rgba(0, 0, 0, 0.8)" v-cloak>
    <div class="toolbar">
        <div class="left">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item v-for="title in breadcrumb" :key="title">
                    {{ title }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="right">
            <span v-for="tab in menu" :key="tab" @click="selMenu(tab)"
            :class="{'menu': true, 'selected': tab == selectedMenu}">
                {{ tab }}
            </span>
        </div>
    </div>
    <div class="custom-alarm-cont" v-show="showCustomAlarm">
        <el-form ref="addAlarmForm" :model="model" :rules="rules" label-position="right" label-width="120px" size="mini">
            <el-form-item label="告警级别" prop="alarmLevel">
                <el-select v-model="model.alarmLevel">
                    <el-option v-for="lvl in alarmLevels" :key="lvl.value" :label="lvl.label" :value="lvl.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="告警规格类别" prop="alarmDefCategory">
                <el-select v-model="model.alarmDefCategory" @change="selAlarmDefCategory">
                    <el-option v-for="cata in alarmDefCategorys" :key="cata.value" :label="cata.label" :value="cata.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="告警规格" prop="alarmDef">
                <el-select v-model="model.alarmDef">
                    <el-option v-for="def in alarmDefs" :key="def.value" :label="def.label" :value="def.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="告警设备">
                <el-input v-model="device.deviceName" disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="设备类型">
                <el-input v-model="device.deviceDef && device.deviceDef.defName" disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="告警描述">
                <el-input textarea v-model="model.description"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="confirmAddAlarm">新增告警</el-button>
                <el-button @click="cancelAddAlarm">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>