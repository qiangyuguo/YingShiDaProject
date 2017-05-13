using System;
using System.ComponentModel;
using System.Web.UI.WebControls;

namespace Method
{
    #region 产品类型
    public class ProductType : EnumList
    {
        public ProductType()
        {
            m_ObjectList = new Item[9];
            m_ObjectList[0] = new Item((int)ProductTypeList.ServoDriver, "伺服驱动器");
            m_ObjectList[1] = new Item((int)ProductTypeList.ServoMotor, "伺服电机");
            m_ObjectList[2] = new Item((int)ProductTypeList.ClosedLoopDteppingDrive, "闭环步进驱动");
            m_ObjectList[3] = new Item((int)ProductTypeList.StepDrive, "步进驱动器");
            m_ObjectList[4] = new Item((int)ProductTypeList.ClosedLoopStepperMotor, "闭环步进电机");
            m_ObjectList[5] = new Item((int)ProductTypeList.LinearSteppingMotor, "直线步进电机");
            m_ObjectList[6] = new Item((int)ProductTypeList.StepperMotor, "步进电机");
            m_ObjectList[7] = new Item((int)ProductTypeList.SteppingMotor, "日本SANYO山洋步进电机");
            m_ObjectList[8] = new Item((int)ProductTypeList.OtherProducts, "其他产品");
            
        }
    }

    public enum ProductTypeList
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
    #endregion

    #region baseclass

    [Serializable]
    public class EnumList
    {
        public Item[] m_ObjectList;
        public void BindDropDownList(DropDownList obj)
        {
            if (obj == null)
                return;
            obj.DataSource = this.m_ObjectList;
            obj.DataTextField = "m_Name";
            obj.DataValueField = "m_Value";
            obj.DataBind();
        }
        public string GetName(object value)
        {
            if (value == null)
                return "";
            foreach (Item it in m_ObjectList)
            {

                if (it.m_Value.GetType() == typeof(Int32))
                {
                    try
                    {
                        if (Int32.Parse(it.m_Value.ToString()) == Int32.Parse(value.ToString()))
                            return it.m_Name;
                    }
                    catch (Exception)
                    {
                        return "";
                    }
                }
                else
                {
                    if (it.m_Value.ToString().Equals(value))
                        return it.m_Name;
                }
            }

            return "";
        }

        public object GetValue(string Name, string tName)
        {
            foreach (Item it in m_ObjectList)
            {
                try
                {
                    if (it.m_Name.Equals(Name) ||
                        it.m_Name.Equals(tName + Name) ||
                        it.m_Name.Equals(Name + tName))
                    {
                        return it.m_Value;
                    }
                }
                catch (Exception e)
                {
                    break;
                }
            }
            return "";
        }

        public object GetValue(string Name)
        {
            foreach (Item it in m_ObjectList)
            {
                try
                {
                    if (it.m_Name.Equals(Name))
                    {
                        return it.m_Value;
                    }

                }
                catch (Exception e)
                {
                    break;
                }
            }
            return "";
        }

        public int GetIndex(object value)
        {
            for (int i = 0; i < m_ObjectList.Length; i++)
            {
                Item it = m_ObjectList[i];
                if (it.m_Value.GetType() == typeof(Int32))
                {
                    try
                    {
                        if (Int32.Parse(it.m_Value.ToString()) == Int32.Parse(value.ToString()))
                            return i;
                    }
                    catch (Exception)
                    {
                        return 0;
                    }
                }
                else
                {
                    if (it.m_Value.ToString().Equals(value))
                        return i;
                }
            }
            return 0;
        }
    }
    [Serializable]
    public class Item : Object
    {
        public Object m_Value { get; set; }
        public string m_Name { get; set; }

        public Item(Object value, string name)
        {
            m_Value = value;
            m_Name = name;
        }



        public override string ToString()
        {
            return m_Name;
        }
    }
    #endregion
}
