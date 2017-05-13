use YingShiDa
go
alter table dbo.CommonQuestion add Keywords nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO关键字',
   'user', 'dbo', 'table', 'CommonQuestion', 'column', 'Keywords'
go
alter table dbo.CommonQuestion add Description nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO内容',
   'user', 'dbo', 'table', 'CommonQuestion', 'column', 'Description'
go

alter table dbo.Company_Culture add Keywords nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO关键字',
   'user', 'dbo', 'table', 'Company_Culture', 'column', 'Keywords'
go
alter table dbo.Company_Culture add Description nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO内容',
   'user', 'dbo', 'table', 'Company_Culture', 'column', 'Description'
go


alter table dbo.Company_History add Keywords nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO关键字',
   'user', 'dbo', 'table', 'Company_History', 'column', 'Keywords'
go
alter table dbo.Company_History add Description nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO内容',
   'user', 'dbo', 'table', 'Company_History', 'column', 'Description'
go

alter table dbo.Company_Honor add Keywords nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO关键字',
   'user', 'dbo', 'table', 'Company_Honor', 'column', 'Keywords'
go
alter table dbo.Company_Honor add Description nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO内容',
   'user', 'dbo', 'table', 'Company_Honor', 'column', 'Description'
go

alter table dbo.Company_Location add Keywords nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO关键字',
   'user', 'dbo', 'table', 'Company_Location', 'column', 'Keywords'
go
alter table dbo.Company_Location add Description nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO内容',
   'user', 'dbo', 'table', 'Company_Location', 'column', 'Description'
go

alter table dbo.Company_News add Keywords nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO关键字',
   'user', 'dbo', 'table', 'Company_News', 'column', 'Keywords'
go
alter table dbo.Company_News add Description nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO内容',
   'user', 'dbo', 'table', 'Company_News', 'column', 'Description'
go

alter table dbo.Company_Profile add Keywords nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO关键字',
   'user', 'dbo', 'table', 'Company_Profile', 'column', 'Keywords'
go
alter table dbo.Company_Profile add Description nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO内容',
   'user', 'dbo', 'table', 'Company_Profile', 'column', 'Description'
go

alter table dbo.Contact_US add Keywords nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO关键字',
   'user', 'dbo', 'table', 'Contact_US', 'column', 'Keywords'
go
alter table dbo.Contact_US add Description nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO内容',
   'user', 'dbo', 'table', 'Contact_US', 'column', 'Description'
go

alter table dbo.InBanner add Keywords nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO关键字',
   'user', 'dbo', 'table', 'InBanner', 'column', 'Keywords'
go
alter table dbo.InBanner add Description nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO内容',
   'user', 'dbo', 'table', 'InBanner', 'column', 'Description'
go

alter table dbo.Industry_News add Keywords nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO关键字',
   'user', 'dbo', 'table', 'Industry_News', 'column', 'Keywords'
go
alter table dbo.Industry_News add Description nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO内容',
   'user', 'dbo', 'table', 'Industry_News', 'column', 'Description'
go

alter table dbo.InTeam add Keywords nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO关键字',
   'user', 'dbo', 'table', 'InTeam', 'column', 'Keywords'
go
alter table dbo.InTeam add Description nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO内容',
   'user', 'dbo', 'table', 'InTeam', 'column', 'Description'
go

alter table dbo.ProductCenter add Keywords nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO关键字',
   'user', 'dbo', 'table', 'ProductCenter', 'column', 'Keywords'
go
alter table dbo.ProductCenter add Description nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO内容',
   'user', 'dbo', 'table', 'ProductCenter', 'column', 'Description'
go

alter table dbo.ProductCenterDetail add Keywords nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO关键字',
   'user', 'dbo', 'table', 'ProductCenterDetail', 'column', 'Keywords'
go
alter table dbo.ProductCenterDetail add Description nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO内容',
   'user', 'dbo', 'table', 'ProductCenterDetail', 'column', 'Description'
go

alter table dbo.Recruitment add Keywords nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO关键字',
   'user', 'dbo', 'table', 'Recruitment', 'column', 'Keywords'
go
alter table dbo.Recruitment add Description nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO内容',
   'user', 'dbo', 'table', 'Recruitment', 'column', 'Description'
go

alter table dbo.Service_Concept add Keywords nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO关键字',
   'user', 'dbo', 'table', 'Service_Concept', 'column', 'Keywords'
go
alter table dbo.Service_Concept add Description nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO内容',
   'user', 'dbo', 'table', 'Service_Concept', 'column', 'Description'
go

alter table dbo.Staff_Presence add Keywords nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO关键字',
   'user', 'dbo', 'table', 'Staff_Presence', 'column', 'Keywords'
go
alter table dbo.Staff_Presence add Description nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO内容',
   'user', 'dbo', 'table', 'Staff_Presence', 'column', 'Description'
go

alter table dbo.Talent_Concept add Keywords nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO关键字',
   'user', 'dbo', 'table', 'Talent_Concept', 'column', 'Keywords'
go
alter table dbo.Talent_Concept add Description nvarchar(500)
execute sp_addextendedproperty 'MS_Description', 
   'SEO内容',
   'user', 'dbo', 'table', 'Talent_Concept', 'column', 'Description'
go
