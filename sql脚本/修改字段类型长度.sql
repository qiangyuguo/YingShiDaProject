use YingShiDa
go
alter table dbo.CommonQuestion alter column Title nvarchar(150)
alter table dbo.CommonQuestion alter column CreatetPeople nvarchar(50)
sp_rename 'CommonQuestion.CreatetPeople','CreatePeople'

alter table dbo.Company_Culture alter column Title nvarchar(150)
alter table dbo.Company_Culture alter column CreatetPeople nvarchar(50)
sp_rename 'Company_Culture.CreatetPeople','CreatePeople'

alter table dbo.Company_History alter column Title nvarchar(150)
alter table dbo.Company_History alter column CreatetPeople nvarchar(50)
sp_rename 'Company_History.CreatetPeople','CreatePeople'

alter table dbo.Company_Honor alter column Title nvarchar(150)
alter table dbo.Company_Honor alter column CreatetPeople nvarchar(50)
sp_rename 'Company_Honor.CreatetPeople','CreatePeople'

alter table dbo.Company_Location alter column Title nvarchar(150)
alter table dbo.Company_Location alter column CreatetPeople nvarchar(50)
sp_rename 'Company_Location.CreatetPeople','CreatePeople'

alter table dbo.Company_News alter column Title nvarchar(150)
alter table dbo.Company_News alter column CreatetPeople nvarchar(50)
sp_rename 'Company_News.CreatetPeople','CreatePeople'

alter table dbo.Company_Profile alter column Title nvarchar(150)
alter table dbo.Company_Profile alter column CreatetPeople nvarchar(50)
sp_rename 'Company_Profile.CreatetPeople','CreatePeople'

alter table dbo.Contact_US alter column Title nvarchar(150)
alter table dbo.Contact_US alter column CreatetPeople nvarchar(50)
sp_rename 'Contact_US.CreatetPeople','CreatePeople'

alter table dbo.InBanner alter column Title nvarchar(150)
alter table dbo.InBanner alter column CreatePeople nvarchar(150)

alter table dbo.Industry_News alter column Title nvarchar(150)
alter table dbo.Industry_News alter column CreatetPeople nvarchar(50)
sp_rename 'Industry_News.CreatetPeople','CreatePeople'

alter table dbo.InTeam alter column Title nvarchar(150)
alter table dbo.InTeam alter column CreatePeople nvarchar(50)
sp_rename 'InTeam.COntent2','Content2'

alter table dbo.ProductCenter alter column ProductTitle nvarchar(150)
alter table dbo.ProductCenter alter column CreatetPeople nvarchar(50)
sp_rename 'ProductCenter.CreatetPeople','CreatePeople'

alter table dbo.ProductCenterDetail alter column Title nvarchar(150)
alter table dbo.ProductCenterDetail alter column CreatetPeople nvarchar(50)
sp_rename 'ProductCenterDetail.CreatetPeople','CreatePeople'

alter table dbo.Recruitment alter column Title nvarchar(150)
alter table dbo.Recruitment alter column CreatetPeople nvarchar(50)
sp_rename 'Recruitment.CreatetPeople','CreatePeople'

alter table dbo.Service_Concept alter column Title nvarchar(150)
alter table dbo.Service_Concept alter column CreatetPeople nvarchar(50)
sp_rename 'Service_Concept.CreatetPeople','CreatePeople'

alter table dbo.Staff_Presence alter column Title nvarchar(150)
alter table dbo.Staff_Presence alter column CreatetPeople nvarchar(50)
sp_rename 'Staff_Presence.CreatetPeople','CreatePeople'

alter table dbo.Talent_Concept alter column Title nvarchar(150)
alter table dbo.Talent_Concept alter column CreatetPeople nvarchar(50)
sp_rename 'Talent_Concept.CreatetPeople','CreatePeople'