using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Xml;

namespace Common
{
    public class WebSite
    {
        //图片服务器WEB地址(个人形象照片、相册)
        public static string IMAGESERVER_WEBPATH = ConfigurationManager.AppSettings["ImageServerWebPath"];
        //图片服务器的物理地址
        public static string IMAGESERVER_LOCALPATH = ConfigurationManager.AppSettings["ImageServerLocalPath"];
        /// <summary>
        /// 导出数据管理地址
        /// </summary>
        public static string SERVER_EXPORTFILE_LOCALPATH = IMAGESERVER_LOCALPATH + "\\ExportManageData";
        public static string SERVER_EXPORTFILE_WEBPATH = IMAGESERVER_WEBPATH + "/ExportManageData";
        //模板物理地址
        public static string TEMPLATES_LOCAL_PATH = ConfigurationManager.AppSettings["TemplatesLocalPath"];
        //模板web地址
        public static string TEMPLATES_WEB_PATH = ConfigurationManager.AppSettings["TemplatesWebPath"];
        //加密机地址
        public static string ENCRYPTOR_URL = ConfigurationManager.AppSettings["ENCRYPTOR_URL"];

        //读取费率配置文件
        private static List<double>[] CUSTOMER_CONFIG_RATE = null;
        //获取通道导入导出配置文件地址
        public static string GetChannelDataAdapterPath()
        {
            return WebSite.IMAGESERVER_LOCALPATH + "FileDataAdapter\\";
        }
        //获取通道导入导出配置文件地址
        public static string GetP2PExportDaifuFilePath(DateTime exportTime)
        {
            return WebSite.IMAGESERVER_LOCALPATH + "P2P\\DaifuOrder\\" + exportTime.ToString("yyyyMMdd") + "\\";
        }
        //获取通道导入导出配置文件地址
        public static string GetWebP2PExportDaifuFilePath(DateTime exportTime)
        {
            return WebSite.IMAGESERVER_WEBPATH + "P2P/DaifuOrder/" + exportTime.ToString("yyyyMMdd") + "/";
        }
        //获取通道导入导出配置文件地址
        public static string GetP2PDaifuFuHeFilePath(DateTime exportTime)
        {
            return WebSite.IMAGESERVER_LOCALPATH + "P2P\\DaifuOrderFuhe\\" + exportTime.ToString("yyyyMMdd") + "\\";
        }
        //获取通道导入导出配置文件地址
        public static string GetSysDaifuDuiZhangeFilePath(DateTime exportTime)
        {
            return WebSite.IMAGESERVER_LOCALPATH + "P2P\\DaifuOrderDuizhang\\" + exportTime.ToString("yyyyMMdd") + "\\";
        }
        //获取对账文件本地路径
        public static string GetReconciliationLocalFilePath(DateTime workData)
        {
            return Common.WebSite.IMAGESERVER_LOCALPATH + "\\Reconciliation\\" + workData.ToString("yyyy-MM-dd");
        }

        //获取对账文件本地路径
        public static string GetReconciliationWebFilePath(DateTime workData)
        {
            return Common.WebSite.IMAGESERVER_WEBPATH + "/Reconciliation/" + workData.ToString("yyyy-MM-dd");
        }
        //获取对账文件服务器路径
        public static string GetReconciliationServerFilePath(DateTime workData)
        {
            return Common.WebSite.IMAGESERVER_LOCALPATH + "\\Reconciliation\\" + workData.ToString("yyyy-MM-dd");
        }

        //获取对账描述文件本地路径
        public static string GetReconciliationConfigFilePath()
        {
            return Common.WebSite.IMAGESERVER_LOCALPATH + "\\FileDataAdapter";
        }

        public static List<double>[] GetCustomerRate()
        {
            if (CUSTOMER_CONFIG_RATE == null)
            {
                XmlDocument doc = new XmlDocument();
                try
                {
                    List<double> RealRate = new List<double>();
                    List<double> RealRateCap = new List<double>();
                    List<double> NoRealRate = new List<double>();
                    List<double> NoRealRateCap = new List<double>();
                    List<double> ReturnRate = new List<double>();
                    List<double> CreditRate = new List<double>();
                    doc.Load(AppDomain.CurrentDomain.BaseDirectory + "Config/RateConfig.xml");
                    foreach (XmlNode cn in doc.ChildNodes)
                    {
                        if (cn.Name == "Root")
                            foreach (XmlNode R in cn.ChildNodes)
                            {
                                foreach (XmlNode v in R.ChildNodes)
                                {
                                    double value = 0;
                                    double.TryParse(v.InnerText, out value);
                                    switch (R.Name)
                                    {
                                        case "RealRate":
                                            RealRate.Add(value);
                                            break;
                                        case "RealRateCap":
                                            RealRateCap.Add(value);
                                            break;
                                        case "NoRealRate":
                                            NoRealRate.Add(value);
                                            break;
                                        case "NoRealRateCap":
                                            NoRealRateCap.Add(value);
                                            break;
                                        case "ReturnRate":
                                            ReturnRate.Add(value);
                                            break;
                                        case "CreditRate":
                                            CreditRate.Add(value);
                                            break;

                                    }
                                }
                            }
                    }
                    CUSTOMER_CONFIG_RATE = new List<double>[] { RealRate, RealRateCap, NoRealRate, NoRealRateCap, ReturnRate, CreditRate };
                }
                catch (Exception ex)
                {

                }
            }
            return CUSTOMER_CONFIG_RATE;
        }
        /**一级代理商平台地址**/
        public static string AngencyURL = ConfigurationManager.AppSettings["ANGENCY_URL"];
        /**二级代理商平台地址**/
        public static string LowerAngencyURL = ConfigurationManager.AppSettings["LOWERANGENCY_URL"];
        /**商户管理平台地址**/
        public static string MemberURL = ConfigurationManager.AppSettings["MEMBER_URL"];
        /**会员推广人平台地址**/
        public static string MemberPromotionURL = ConfigurationManager.AppSettings["MEMBERPROMOTION_URL"];
        /**商圈平台地址**/
        public static string BusinessAreaURL = ConfigurationManager.AppSettings["BUSINESSAREA_URL"];

        public class Bank
        {
            public string Code;
            public string Name;
        }

        /// <summary>
        /// 支持的银行卡列表
        /// </summary>
        private static List<Bank> BankList = null;
        public static List<Bank> GetBankList()
        {
            if (BankList == null)
            {
                XmlDocument doc = new XmlDocument();
                try
                {
                    doc.Load(AppDomain.CurrentDomain.BaseDirectory + "Config/BankList.xml");
                    foreach (XmlNode bl in doc.ChildNodes)
                    {
                        if (bl.Name.Equals("BankList"))
                        {
                            BankList = new List<Bank>();
                            foreach (XmlNode b in bl.ChildNodes)
                            {
                                Bank bank = new Bank();
                                bank.Code = b.ChildNodes[0].InnerText;
                                bank.Name = b.ChildNodes[1].InnerText;
                                BankList.Add(bank);
                            }
                            return BankList;
                        }

                    }

                }
                catch (Exception ex)
                {

                }

            }
            return BankList;
        }

        public static void ResetBankList()
        {
            XmlDocument doc = new XmlDocument();
            try
            {
                doc.Load(AppDomain.CurrentDomain.BaseDirectory + "Config/BankList.xml");
                foreach (XmlNode bl in doc.ChildNodes)
                {
                    if (bl.Name.Equals("BankList"))
                    {
                        BankList = new List<Bank>();
                        foreach (XmlNode b in bl.ChildNodes)
                        {
                            Bank bank = new Bank();
                            bank.Code = b.ChildNodes[0].InnerText;
                            bank.Name = b.ChildNodes[1].InnerText;
                            BankList.Add(bank);
                        }
                    }

                }

            }
            catch (Exception ex)
            {

            };
        }

        public class Menu
        {
            public string ParentKey;
            private string name;
            public string Name
            {
                get { return name; }
                set { name = value; }
            }
            private string key;
            public string Key
            {
                get { return key; }
                set { key = value; }
            }
            public string Value;

            private string model;
            public string Model
            {
                get { return model; }
                set { model = value; }
            }
            public bool Visible = true;
        }
        private static List<Menu> PlatformMenuList = null;
        private static List<Menu> MemberMenuList = null;
        /// <summary>
        /// 平台的全部菜单
        /// </summary>
        /// <returns></returns>
        public static List<Menu> GetPlatformMenuList()
        {
            if (PlatformMenuList == null)
            {
                XmlDocument doc = new XmlDocument();
                try
                {
                    doc.Load(AppDomain.CurrentDomain.BaseDirectory + "Config/MenuList.xml");
                    foreach (XmlNode b in doc.ChildNodes)
                    {
                        if (b.Name.Equals("MenuList"))
                        {
                            PlatformMenuList = new List<Menu>();
                            ParseMenu(null, PlatformMenuList, b);
                            return PlatformMenuList;
                        }
                    }

                }
                catch (Exception ex)
                {

                }

            }
            return PlatformMenuList;
        }

        public static List<Menu> GetMemberMenuList()
        {
            if (MemberMenuList == null)
            {
                XmlDocument doc = new XmlDocument();
                try
                {
                    doc.Load(AppDomain.CurrentDomain.BaseDirectory + "Config/MemberMenu.xml");
                    foreach (XmlNode b in doc.ChildNodes)
                    {
                        if (b.Name.Equals("MenuList"))
                        {
                            MemberMenuList = new List<Menu>();
                            ParseMenu(null, MemberMenuList, b);
                            return MemberMenuList;
                        }
                    }

                }
                catch (Exception ex)
                {

                }

            }
            return MemberMenuList;
        }

        private static List<Menu> AngencyMenuList = null;
        /// <summary>
        /// 代理商的全部菜单
        /// </summary>
        /// <returns></returns>
        public static List<Menu> GetAngencyMenuList()
        {
            if (AngencyMenuList == null)
            {
                XmlDocument doc = new XmlDocument();
                try
                {
                    doc.Load(AppDomain.CurrentDomain.BaseDirectory + "Config/AngencyMenuList.xml");
                    foreach (XmlNode b in doc.ChildNodes)
                    {
                        if (b.Name.Equals("MenuList"))
                        {
                            AngencyMenuList = new List<Menu>();
                            ParseMenu(null, AngencyMenuList, b);
                            return AngencyMenuList;
                        }
                    }

                }
                catch (Exception ex)
                {
                    LogTool.LogWriter.WriteError(ex.ToString());
                }

            }
            return AngencyMenuList;
        }



        private static List<Menu> DealerAllMenuList = null;
        /// <summary>
        /// 经销商的全部菜单
        /// </summary>
        ///  <param name="isBusinessArea">true：商圈下的经销商; false:非商圈的经销商登录</param>
        /// <returns></returns>
        public static List<Menu> GetDealerMenuList()
        {
            DealerAllMenuList = new List<Menu>();
            XmlDocument doc = new XmlDocument();
            try
            {
                doc.Load(AppDomain.CurrentDomain.BaseDirectory + "Config/DealerAllMenuList.xml");
                foreach (XmlNode b in doc.ChildNodes)
                {
                    if (b.Name.Equals("MenuList"))
                    {
                        DealerAllMenuList = new List<Menu>();
                        ParseMenu(null, DealerAllMenuList, b);
                        return DealerAllMenuList;
                    }
                }

            }
            catch (Exception ex)
            {
                LogTool.LogWriter.WriteError(ex.ToString());
            }
            return DealerAllMenuList;
        }
        /// <summary>
        /// 会员推广人的全部菜单
        /// </summary>
        private static List<Menu> memberPromotionMenuList = null;
        /// <summary>
        /// 会员推广人的全部菜单
        /// </summary>
        /// <returns></returns>
        public static List<Menu> GetPromotionMenuList(bool isCustomer)
        {
            memberPromotionMenuList = new List<Menu>();
            XmlDocument doc = new XmlDocument();
            try
            {
                if (isCustomer)
                {
                    doc.Load(AppDomain.CurrentDomain.BaseDirectory + "Config/JoinMenuList.xml");
                }
                else
                {
                    doc.Load(AppDomain.CurrentDomain.BaseDirectory + "Config/PromotionMenuList.xml");
                }
                foreach (XmlNode b in doc.ChildNodes)
                {
                    if (b.Name.Equals("MenuList"))
                    {
                        ParseMenu(null, memberPromotionMenuList, b);
                        return memberPromotionMenuList;
                    }
                }

            }
            catch (Exception ex)
            {

            }
            return memberPromotionMenuList;
        }


        private static void ParseMenu(Menu ParentMenu, List<Menu> MenuList, XmlNode b)
        {
            foreach (XmlNode b1 in b.ChildNodes)
            {
                Menu m = new Menu();
                m.ParentKey = ParentMenu == null ? "" : ParentMenu.Key;
                m.Name = b1.Attributes["name"].Value;
                m.Key = b1.Attributes["key"].Value;
                m.Value = b1.Attributes["value"].Value;
                XmlAttribute a = b1.Attributes["visible"];
                if (a != null)
                {
                    m.Visible = !(a.Value.ToString().Trim().ToUpper() == "FALSE");
                }
                a = b1.Attributes["model"];
                if (a != null)
                {
                    m.Model = a.Value.Trim();
                }
                MenuList.Add(m);
                if (b1.ChildNodes.Count > 0)
                {
                    ParseMenu(m, MenuList, b1);
                }

            }
        }


        public class QuickMoneyConfig
        {
            //银行卡受理标志* 0-否 1是
            public string BankCardAcceptFlag;
            //储值卡受理标志* 0-否 1是
            public string SavingsCardAcceptFlag;
            //结算等级
            public string SettleLevel;
            //清算延期天数
            public string SettleLaterDays;
            //结算周期
            public string SettleTime;
            //结算方式
            public string SettleType;
            //手续费结算方法 0-交易内结算 1-交易外结算
            public string FeeSettle;
            //外部跟踪编号唯一标志 0-否 1-是
            public string OutSideUniqueFlag;
            //通知交易标志0-否 1-是
            public string NotifyDealFlag;
            //受理卡机构类型  VI——Visa MC——MasterCard AX——American Express DC——Diners Club JC——JCB DS——DiscoverCard CU——银联卡 PC——储值卡 UT——UATP 
            public string AcceptCardInstitutionType;
            //设备类型
            public string DeviceType;
            //终端数量
            public string TerminalNumber;
            //员工数量
            public string EmployeesNumber;
            //机构名称
            public string InstitutionName;
            //机构邮箱
            public string InstitutionEmail;
            //申请人
            public string InstitutionContactPeople;
            //商户名称
            public string InstitutionCustomerName;
            //协议签约到期时间
            public string AccordDate;
            //业务所属地区 00-华北 01华南 02华东
            public string BusinessArea;
            //快钱账户
            public string QuickMoenyAccount;
            //销售
            public string Seller;
            //调单联系人
            public string AdjustableSingleContactPeople;
            //调单联系人电话
            public string AdjustableSingleContactPhone;
            //公司
            public string TypeCompanyName;
            //个人
            public string TypePersonName;
            //公司对公
            public string company;
            //个人对私
            public string person;

        }
        private static QuickMoneyConfig mQuickMoneyConfig = null;
        public static QuickMoneyConfig GetQuickMoneyConfig()
        {
            if (null == mQuickMoneyConfig)
            {
                XmlDocument doc = new XmlDocument();
                try
                {
                    doc.Load(AppDomain.CurrentDomain.BaseDirectory + "Config/QuickMoneyConfig.xml");
                    foreach (XmlNode config in doc.ChildNodes)
                    {
                        if (config.Name.ToUpper().Equals("CONFIG"))
                        {
                            mQuickMoneyConfig = new QuickMoneyConfig();
                            foreach (XmlNode b in config.ChildNodes)
                            {
                                string Value = b.InnerText.Replace("\r\n", "").Trim();
                                switch (b.Name.ToUpper())
                                {
                                    case "BANKCARDACCEPTFLAG": mQuickMoneyConfig.BankCardAcceptFlag = Value; break;
                                    case "SAVINGSCARDACCEPTFLAG": mQuickMoneyConfig.SavingsCardAcceptFlag = Value; break;
                                    case "SETTLELEVEL": mQuickMoneyConfig.SettleLevel = Value; break;
                                    case "SETTLELATERDAYS": mQuickMoneyConfig.SettleLaterDays = Value; break;
                                    case "SETTLETYPE": mQuickMoneyConfig.SettleType = Value; break;
                                    case "SETTLETIME": mQuickMoneyConfig.SettleTime = Value; break;
                                    case "FEESETTLE": mQuickMoneyConfig.FeeSettle = Value; break;
                                    case "OUTSIDEUNIQUEFLAG": mQuickMoneyConfig.OutSideUniqueFlag = Value; break;
                                    case "NOTIFYDEALFLAG": mQuickMoneyConfig.NotifyDealFlag = Value; break;
                                    case "ACCEPTCARDINSTITUTIONTYPE": mQuickMoneyConfig.AcceptCardInstitutionType = Value; break;
                                    case "DEVICETYPE": mQuickMoneyConfig.DeviceType = Value; break;
                                    case "TERMINALNUMBER": mQuickMoneyConfig.TerminalNumber = Value; break;
                                    case "EMPLOYEESNUMBER": mQuickMoneyConfig.EmployeesNumber = Value; break;
                                    case "INSTITUTIONNAME": mQuickMoneyConfig.InstitutionName = Value; break;
                                    case "INSTITUTIONCONTACTPEOPLE": mQuickMoneyConfig.InstitutionContactPeople = Value; break;
                                    case "INSTITUTIONCUSTOMERNAME": mQuickMoneyConfig.InstitutionCustomerName = Value; break;
                                    case "ACCORDDATE": mQuickMoneyConfig.AccordDate = Value; break;
                                    case "BUSINESSAREA": mQuickMoneyConfig.BusinessArea = Value; break;
                                    case "QUICKMOENYACCOUNT": mQuickMoneyConfig.QuickMoenyAccount = Value; break;
                                    case "SELLER": mQuickMoneyConfig.Seller = Value; break;
                                    case "ADJUSTABLESINGLECONTACTPEOPLE": mQuickMoneyConfig.AdjustableSingleContactPeople = Value; break;
                                    case "ADJUSTABLESINGLECONTACTPHONE": mQuickMoneyConfig.AdjustableSingleContactPhone = Value; break;
                                    case "TYPECOMPANYNAME": mQuickMoneyConfig.TypeCompanyName = Value; break;
                                    case "TYPEPERSONNAME": mQuickMoneyConfig.TypePersonName = Value; break;
                                    case "INSTITUTIONEMAIL": mQuickMoneyConfig.InstitutionEmail = Value; break;
                                    case "COMPANY": mQuickMoneyConfig.company = Value; break;
                                    case "PERSON": mQuickMoneyConfig.person = Value; break;
                                }
                            }
                        }
                    }
                }
                finally
                {

                }
            }
            return mQuickMoneyConfig;
        }
        /// <summary>
        /// 商圈的全部菜单
        /// </summary>
        private static List<Menu> BusinessAreaMenuList = null;
        /// <summary>
        /// 获取商圈菜单
        /// </summary>
        /// <returns></returns>
        public static List<Menu> GetBusinessAreaMenuList()
        {
            if (BusinessAreaMenuList == null)
            {
                XmlDocument doc = new XmlDocument();
                try
                {
                    doc.Load(AppDomain.CurrentDomain.BaseDirectory + "Config/BusinessAreaMenu.xml");
                    foreach (XmlNode b in doc.ChildNodes)
                    {
                        if (b.Name.Equals("MenuList"))
                        {
                            BusinessAreaMenuList = new List<Menu>();
                            ParseMenu(null, BusinessAreaMenuList, b);
                            return BusinessAreaMenuList;
                        }
                    }

                }
                catch (Exception ex)
                {

                }

            }
            return BusinessAreaMenuList;
        }

        public class SupportDevice
        {
            public string Name { get; set; }
            public string Model { get; set; }
            public string Vender { get; set; }
            public string Type { get; set; }
            public int TypeValue { get; set; }
        }

        /// <summary>
        /// 平台的全部菜单
        /// </summary>
        /// <returns></returns>
        public static List<SupportDevice> GetPlatSupportDevices()
        {
            List<SupportDevice> devices = new List<SupportDevice>(); ;
            XmlDocument doc = new XmlDocument();
            try
            {
                string path = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Config/Devices.xml");
                if (!System.IO.File.Exists(path))
                {
                    System.IO.DirectoryInfo d = new System.IO.DirectoryInfo(AppDomain.CurrentDomain.BaseDirectory);
                    path = System.IO.Path.Combine(System.IO.Path.Combine(d.Parent.FullName, "Manage"), "Config/Devices.xml");
                }
                doc.Load(path);
                foreach (XmlNode b in doc.DocumentElement.ChildNodes)
                {
                    if (b != null)
                    {
                        SupportDevice d = new SupportDevice();
                        d.Name = b.Attributes["Name"].Value;
                        d.Model = b.Attributes["Model"].Value;
                        d.Vender = b.Attributes["Vender"].Value;
                        d.Type = b.Attributes["Type"].Value;
                        string typevalue = b.Attributes["TypeValue"].Value;
                        int value = 0;
                        int.TryParse(typevalue, out value);
                        d.TypeValue = value;
                        devices.Add(d);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return devices;
        }
        /// <summary>
        /// 机构入件菜单
        /// </summary>
        /// <param name="isCustomer"></param>
        /// <returns></returns>
        public static List<Menu> GetSiteIDMenuList()
        {
            memberPromotionMenuList = new List<Menu>();
            XmlDocument doc = new XmlDocument();
            try
            {
                //if (isCustomer)
                //{
                doc.Load(AppDomain.CurrentDomain.BaseDirectory + "Config/SiteInfoMenuList.xml");
                //}
                //else
                //{
                //    doc.Load(AppDomain.CurrentDomain.BaseDirectory + "Config/PromotionMenuList.xml");
                //}
                foreach (XmlNode b in doc.ChildNodes)
                {
                    if (b.Name.Equals("MenuList"))
                    {
                        ParseMenu(null, memberPromotionMenuList, b);
                        return memberPromotionMenuList;
                    }
                }

            }
            catch (Exception ex)
            {

            }
            return memberPromotionMenuList;
        }


        #region GQY 根据xml得到菜单
        public static List<Menu> GetBusinessAreaMenuList(string EditionMenu)
        {
            List<Menu> BusinessAreaMenuList = null;
            if (BusinessAreaMenuList == null)
            {
                XmlDocument doc = new XmlDocument();
                try
                {
                    doc.Load(AppDomain.CurrentDomain.BaseDirectory + EditionMenu);
                    foreach (XmlNode b in doc.ChildNodes)
                    {
                        if (b.Name.Equals("MenuList"))
                        {
                            BusinessAreaMenuList = new List<Menu>();
                            ParseMenu(null, BusinessAreaMenuList, b);
                            return BusinessAreaMenuList;
                        }
                    }

                }
                catch (Exception ex)
                {

                }
            }
            return BusinessAreaMenuList;
        }
        #endregion
    }
}
