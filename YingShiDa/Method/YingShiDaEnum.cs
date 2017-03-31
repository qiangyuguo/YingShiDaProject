using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Method
{
    public enum YingShiDaEnum
    {
        /// <summary>
        /// 伺服驱动器
        /// </summary>
        [Description("伺服驱动器")]
        ServoDriver = 1,
        /// <summary>
        /// 伺服电机
        /// </summary>
        [Description("伺服电机")]
        ServoMotor = 2,
        /// <summary>
        /// 闭环步进驱动
        /// </summary>
        [Description("闭环步进驱动")]
        ClosedLoopDteppingDrive = 3,
        /// <summary>
        /// 步进驱动器
        /// </summary>
        [Description("步进驱动器")]
        StepDrive = 4,
        /// <summary>
        /// 闭环步进电机
        /// </summary>
        [Description("闭环步进电机")]
        ClosedLoopStepperMotor = 5,
        /// <summary>
        /// 直线步进电机
        /// </summary>
        [Description("直线步进电机")]
        LinearSteppingMotor = 6,
        /// <summary>
        /// 步进电机
        /// </summary>
        [Description("步进电机")]
        StepperMotor = 7,
        /// <summary>
        /// 日本SANYO山洋步进电机
        /// </summary>
        [Description("日本SANYO山洋步进电机")]
        SteppingMotor = 8,
        /// <summary>
        /// 其他产品
        /// </summary>
        [Description("其他产品")]
        OtherProducts = 9
    }
}
