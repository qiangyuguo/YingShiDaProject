//------------------------------------------------------------------------------
// <auto-generated>
//     此代码已从模板生成。
//
//     手动更改此文件可能导致应用程序出现意外的行为。
//     如果重新生成代码，将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class Company_News
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string CreatePeople { get; set; }
        public string CreateCompany { get; set; }
        public Nullable<System.DateTime> CreateTime { get; set; }
        public Nullable<System.DateTime> UpdateTime { get; set; }
        public Nullable<int> BrowseTimes { get; set; }
        public string LogoUrl { get; set; }
        public Nullable<int> Language { get; set; }
        public string Keywords { get; set; }
        public string Description { get; set; }
    }
}
