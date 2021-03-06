USE [YingShiDa]
GO
/****** Object:  StoredProcedure [dbo].[Common_FastPageList]    Script Date: 2017/5/13 13:40:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--存储过程
CREATE procedure [dbo].[Common_FastPageList]   
@sql nvarchar(max),	--要执行的sql语句
@page int=1, 			--要显示的页码
@pageSize int,			--每页的大小
@pageCount int=0 out,	--总页数
@recordCount int=0 out	--总记录数
as
set nocount on
declare @p1 int
exec sp_cursoropen @p1 output,@sql,@scrollopt=1,@ccopt=1,@rowcount=@pagecount output
set @recordCount = @pageCount
select @pagecount=ceiling(1.0*@pagecount/@pagesize)
	,@page=(@page-1)*@pagesize+1
exec sp_cursorfetch @p1,16,@page,@pagesize 
select @pageCount,@recordCount;



GO
/****** Object:  Table [dbo].[CommonQuestion]    Script Date: 2017/5/13 13:40:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CommonQuestion](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](150) NULL,
	[ContentQuestion] [ntext] NULL,
	[ContentAnswer] [ntext] NULL,
	[CreatePeople] [nvarchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateTime] [datetime] NULL,
	[LogoUrl] [nvarchar](50) NULL,
	[Language] [int] NULL,
	[Keywords] [nvarchar](500) NULL,
	[Description] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Company_Culture]    Script Date: 2017/5/13 13:40:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Company_Culture](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](150) NULL,
	[Content] [ntext] NULL,
	[CreatePeople] [nvarchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateTime] [datetime] NULL,
	[LogoUrl] [nvarchar](50) NULL,
	[Language] [int] NULL,
	[Keywords] [nvarchar](500) NULL,
	[Description] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Company_History]    Script Date: 2017/5/13 13:40:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Company_History](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](150) NULL,
	[Content] [ntext] NULL,
	[CreatePeople] [nvarchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateTime] [datetime] NULL,
	[LogoUrl] [nvarchar](50) NULL,
	[Language] [int] NULL,
	[Keywords] [nvarchar](500) NULL,
	[Description] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Company_Honor]    Script Date: 2017/5/13 13:40:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Company_Honor](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](150) NULL,
	[Content] [ntext] NULL,
	[CreatePeople] [nvarchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateTime] [datetime] NULL,
	[LogoUrl] [nvarchar](50) NULL,
	[Language] [int] NULL,
	[Keywords] [nvarchar](500) NULL,
	[Description] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Company_Location]    Script Date: 2017/5/13 13:40:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Company_Location](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](150) NULL,
	[Content] [ntext] NULL,
	[CreatePeople] [nvarchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateTime] [datetime] NULL,
	[LogoUrl] [nvarchar](50) NULL,
	[Language] [int] NULL,
	[Keywords] [nvarchar](500) NULL,
	[Description] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Company_News]    Script Date: 2017/5/13 13:40:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Company_News](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](150) NULL,
	[Content] [ntext] NULL,
	[CreatePeople] [nvarchar](50) NULL,
	[CreateCompany] [nvarchar](30) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateTime] [datetime] NULL,
	[BrowseTimes] [int] NULL,
	[LogoUrl] [nvarchar](500) NULL,
	[Language] [int] NULL,
	[Keywords] [nvarchar](500) NULL,
	[Description] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Company_Profile]    Script Date: 2017/5/13 13:40:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Company_Profile](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](150) NULL,
	[Content] [ntext] NULL,
	[CreatePeople] [nvarchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateTime] [datetime] NULL,
	[LogoUrl] [nvarchar](50) NULL,
	[TextUrl] [nvarchar](50) NULL,
	[Language] [int] NULL,
	[Keywords] [nvarchar](500) NULL,
	[Description] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Contact_US]    Script Date: 2017/5/13 13:40:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contact_US](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](150) NULL,
	[Department] [nvarchar](30) NULL,
	[Company] [nvarchar](100) NULL,
	[Address] [nvarchar](150) NULL,
	[Phone] [nvarchar](20) NULL,
	[Fax] [nvarchar](30) NULL,
	[Postcode] [nvarchar](20) NULL,
	[mailbox] [nvarchar](20) NULL,
	[CreatePeople] [nvarchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateTime] [datetime] NULL,
	[BrowseTimes] [int] NULL,
	[LogoUrl] [nvarchar](500) NULL,
	[Language] [int] NULL,
	[Keywords] [nvarchar](500) NULL,
	[Description] [nvarchar](500) NULL,
 CONSTRAINT [PK__Contact___3214EC271B0907CE] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[InBanner]    Script Date: 2017/5/13 13:40:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InBanner](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](150) NULL,
	[CreatePeople] [nvarchar](150) NULL,
	[BannerPicname] [nvarchar](500) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateTime] [datetime] NULL,
	[Language] [int] NULL,
	[Keywords] [nvarchar](500) NULL,
	[Description] [nvarchar](500) NULL,
 CONSTRAINT [PK__InBanner__3214EC271ED998B2] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Industry_News]    Script Date: 2017/5/13 13:40:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Industry_News](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](150) NULL,
	[Content] [ntext] NULL,
	[CreatePeople] [nvarchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateTime] [datetime] NULL,
	[BrowseTimes] [int] NULL,
	[LogoUrl] [nvarchar](500) NULL,
	[Language] [int] NULL,
	[Keywords] [nvarchar](500) NULL,
	[Description] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[InTeam]    Script Date: 2017/5/13 13:40:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InTeam](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](150) NULL,
	[Content1] [nvarchar](50) NULL,
	[Content2] [nvarchar](50) NULL,
	[Content3] [nvarchar](50) NULL,
	[CreatePeople] [nvarchar](50) NULL,
	[TeamPicname] [nvarchar](500) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateTime] [datetime] NULL,
	[Language] [int] NULL,
	[Keywords] [nvarchar](500) NULL,
	[Description] [nvarchar](500) NULL,
 CONSTRAINT [PK__InTeam__3214EC27267ABA7A] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ProductCenter]    Script Date: 2017/5/13 13:40:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductCenter](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ProductID] [nvarchar](30) NULL,
	[ProductTitle] [nvarchar](150) NULL,
	[ProductType] [int] NULL,
	[CreatePeople] [nvarchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateTime] [datetime] NULL,
	[LogoUrl] [nvarchar](50) NULL,
	[Language] [int] NULL,
	[Keywords] [nvarchar](500) NULL,
	[Description] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ProductCenterDetail]    Script Date: 2017/5/13 13:40:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductCenterDetail](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ProductDetailID] [nvarchar](30) NULL,
	[ProductModelID] [nvarchar](30) NULL,
	[Title] [nvarchar](150) NULL,
	[Series] [nvarchar](20) NULL,
	[ClothAngle] [nvarchar](20) NULL,
	[Advantage] [ntext] NULL,
	[TechnicalParameter] [ntext] NULL,
	[CreatePeople] [nvarchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateTime] [datetime] NULL,
	[LogoUrl] [nvarchar](50) NULL,
	[FileName] [nvarchar](500) NULL,
	[Language] [int] NULL,
	[Keywords] [nvarchar](500) NULL,
	[Description] [nvarchar](500) NULL,
 CONSTRAINT [PK__ProductC__3214EC276E8B6712] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ProductCenterModel]    Script Date: 2017/5/13 13:40:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductCenterModel](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ProductModelID] [nvarchar](30) NULL,
	[ProductID] [nvarchar](30) NULL,
	[ProductModel] [nvarchar](30) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateTime] [datetime] NULL,
	[Language] [int] NULL,
 CONSTRAINT [PK__ProductC__3214EC276ABAD62E] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ProductRelation]    Script Date: 2017/5/13 13:40:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductRelation](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ProductDetailID] [nvarchar](30) NOT NULL,
	[RelatinProductDetailID] [nvarchar](30) NOT NULL,
 CONSTRAINT [PK_ProductRelation] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Recruitment]    Script Date: 2017/5/13 13:40:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Recruitment](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](150) NULL,
	[CreatePeople] [nvarchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateTime] [datetime] NULL,
	[BrowseTimes] [int] NULL,
	[LogoUrl] [nvarchar](50) NULL,
	[Department] [nvarchar](20) NULL,
	[Number] [int] NULL,
	[Responsibilities] [ntext] NULL,
	[JobRequirements] [ntext] NULL,
	[Salary] [nvarchar](20) NULL,
	[Language] [int] NULL,
	[Keywords] [nvarchar](500) NULL,
	[Description] [nvarchar](500) NULL,
 CONSTRAINT [PK__Recruitm__3214EC275006DFF2] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Service_Concept]    Script Date: 2017/5/13 13:40:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Service_Concept](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](150) NULL,
	[Content] [ntext] NULL,
	[CreatePeople] [nvarchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateTime] [datetime] NULL,
	[LogoUrl] [nvarchar](50) NULL,
	[Language] [int] NULL,
	[Keywords] [nvarchar](500) NULL,
	[Description] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Staff_Presence]    Script Date: 2017/5/13 13:40:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Staff_Presence](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](150) NULL,
	[Content] [ntext] NULL,
	[CreatePeople] [nvarchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateTime] [datetime] NULL,
	[LogoUrl] [nvarchar](50) NULL,
	[Language] [int] NULL,
	[Keywords] [nvarchar](500) NULL,
	[Description] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[SysUser]    Script Date: 2017/5/13 13:40:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SysUser](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [nvarchar](30) NULL,
	[UserName] [nvarchar](30) NULL,
	[PassWord] [nvarchar](30) NULL,
	[Phone] [nvarchar](30) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateTime] [datetime] NULL,
	[Language] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Talent_Concept]    Script Date: 2017/5/13 13:40:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Talent_Concept](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](150) NULL,
	[Content] [ntext] NULL,
	[CreatePeople] [nvarchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[UpdateTime] [datetime] NULL,
	[LogoUrl] [nvarchar](50) NULL,
	[Language] [int] NULL,
	[Keywords] [nvarchar](500) NULL,
	[Description] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[CommonQuestion] ON 

INSERT [dbo].[CommonQuestion] ([ID], [Title], [ContentQuestion], [ContentAnswer], [CreatePeople], [CreateTime], [UpdateTime], [LogoUrl], [Language], [Keywords], [Description]) VALUES (1, N'鸡蛋问题', N'先有鸡还是先有蛋', N'先有男还是先有女', N'郭强煜', CAST(0x0000A73B00ED9450 AS DateTime), CAST(0x0000A73B00ED9450 AS DateTime), N'6fb52baa551445789a3a9960bb378c3e.jpg', NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[CommonQuestion] OFF
SET IDENTITY_INSERT [dbo].[Company_Culture] ON 

INSERT [dbo].[Company_Culture] ([ID], [Title], [Content], [CreatePeople], [CreateTime], [UpdateTime], [LogoUrl], [Language], [Keywords], [Description]) VALUES (1, N'企业宗旨', N'<p>以卓越的专业服务团队，全心全意</p>', N'郭强煜', CAST(0x0000A73B00E15EEC AS DateTime), CAST(0x0000A73B00E15EEC AS DateTime), N'683bb0edde114039b38b3f93370e494b.jpg', NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Company_Culture] OFF
SET IDENTITY_INSERT [dbo].[Company_History] ON 

INSERT [dbo].[Company_History] ([ID], [Title], [Content], [CreatePeople], [CreateTime], [UpdateTime], [LogoUrl], [Language], [Keywords], [Description]) VALUES (1, N'2014年', N'<p><span style="color: rgb(102, 102, 102); font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; white-space: normal;">&nbsp; ● 英士达机电数字型步进驱动器投入生产，数字型步进驱动器采用的是更为强大的DSP处理器(Digital Signal Processor)，能有效的降低步进电机发热、运行噪声和更高的平稳性，彻底解决了步进电机低速共振的难题，把步进电机的最大运行速度提高了一倍，同时也具有更强的抗干扰能力。</span></p>', N'郭强煜', CAST(0x0000A73B00E0D4A4 AS DateTime), CAST(0x0000A73B00E0E890 AS DateTime), N'7f30442f6f2b468cba6eaac1373ba6a9.jpg', NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Company_History] OFF
SET IDENTITY_INSERT [dbo].[Company_Honor] ON 

INSERT [dbo].[Company_Honor] ([ID], [Title], [Content], [CreatePeople], [CreateTime], [UpdateTime], [LogoUrl], [Language], [Keywords], [Description]) VALUES (1, N'企业精神', N'<p><span style="color: rgb(102, 102, 102); font-family: Verdana, Helvetica, sans-serif; font-size: 18px; white-space: normal;">积极敬业、开拓创新、团结协作、诚实守信</span></p>', N'郭强煜', CAST(0x0000A73B00E1D098 AS DateTime), CAST(0x0000A73B00E1D098 AS DateTime), N'b17e9b1e484f490b82d9458e29816403.jpg', NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Company_Honor] OFF
SET IDENTITY_INSERT [dbo].[Company_Location] ON 

INSERT [dbo].[Company_Location] ([ID], [Title], [Content], [CreatePeople], [CreateTime], [UpdateTime], [LogoUrl], [Language], [Keywords], [Description]) VALUES (1, N'深圳市英士达机电技术开发公司', N'<p>深圳市英士达机电技术开发公司</p>', N'郭强煜', CAST(0x0000A73B00F025BC AS DateTime), CAST(0x0000A73B00F025BC AS DateTime), N'bbc8de257dd841dcb347f5bc3ec96ff7.jpg', NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Company_Location] OFF
SET IDENTITY_INSERT [dbo].[Company_News] ON 

INSERT [dbo].[Company_News] ([ID], [Title], [Content], [CreatePeople], [CreateCompany], [CreateTime], [UpdateTime], [BrowseTimes], [LogoUrl], [Language], [Keywords], [Description]) VALUES (1, N'英士达机电成功更换产品LOGO', N'<ul style="color: rgb(102, 102, 102); font-family: Verdana, Helvetica, sans-serif; font-size: 12px; white-space: normal;"><p style="margin-top: 0px; margin-bottom: 0px; line-height: 2em;"><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 16px;">近日，英士达机电成功更换产品LOGO。在竞争激烈的市场上，英士达机电严格管理和正确使用统一的产品LOGO，为我们提供一个更有效、更清晰和更亲切的市场形象。旨在方便客户更好的记住公司的主题和品牌文化。</span></p><p style="margin-top: 0px; margin-bottom: 0px; line-height: 2em;"><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 16px;">&nbsp; &nbsp; &nbsp; &nbsp;产品LOGO：</span></p><p style="margin-top: 0px; margin-bottom: 0px; line-height: 2em;"><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 16px;">&nbsp;</span></p><p style="margin-top: 0px; margin-bottom: 0px;"><br/></p><p style="margin-top: 0px; margin-bottom: 0px; line-height: 2em;"><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 16px;">&nbsp;</span></p><p style="margin-top: 0px; margin-bottom: 0px; line-height: 2em; text-align: right;"><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 16px;">深圳市英士达机电技术开发有限公司</span></p><p style="margin-top: 0px; margin-bottom: 0px; line-height: 2em; text-align: right;"><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 16px;">2012年8月6日</span></p></ul><p><br/></p>', N'郭强煜', N'深圳市英士达机电技术开发有限公司', CAST(0x0000A73B00EA6834 AS DateTime), CAST(0x0000A73B00FBAA2C AS DateTime), 0, N'c4ba13b79abe48e885e3640bf1f183c0.jpg', NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Company_News] OFF
SET IDENTITY_INSERT [dbo].[Company_Profile] ON 

INSERT [dbo].[Company_Profile] ([ID], [Title], [Content], [CreatePeople], [CreateTime], [UpdateTime], [LogoUrl], [TextUrl], [Language], [Keywords], [Description]) VALUES (1, N'深圳市英士达机电技术开发公司', N'<p><span style="color: rgb(102, 102, 102); font-family: Verdana, Helvetica, sans-serif; white-space: normal;">专注于工业自动化控制产品的研发、生产和销售，与各大中高端设备制造商保持着良好的合作关系。公司坚持以质量求生存、以技术求发展以满足客户最真实最迫切的需求，竭尽全力为客户创造最大价值。公司不断引进、培养高层次的技术人员，加大产品的研发与创新力度，保持持续发展的竞争能力。目前已拥有一支追求卓越、勇于创新、经验丰富的研发和销售高水平的专业人员队伍。</span></p>', N'郭强煜', CAST(0x0000A73B00DB798C AS DateTime), CAST(0x0000A73B00DB798C AS DateTime), N'7b70329abd2a49cebb0a6540766a38fe.jpg', N'452ff0ec89e04147a93f7f4343dcc765.jpg', 1, NULL, NULL)
INSERT [dbo].[Company_Profile] ([ID], [Title], [Content], [CreatePeople], [CreateTime], [UpdateTime], [LogoUrl], [TextUrl], [Language], [Keywords], [Description]) VALUES (2, N'英士达机电成功更换产品Logo', N'<ul style="color: rgb(102, 102, 102); font-family: Verdana, Helvetica, sans-serif; font-size: 12px; white-space: normal;"><p style="margin-top: 0px; margin-bottom: 0px; line-height: 3em;"><span style="font-size: 18px;"><strong><span style="color: rgb(0, 0, 0);">亚洲 - 香港</span></strong></span></p><hr/><p style="margin-top: 0px; margin-bottom: 0px;">&nbsp;</p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;">英士达机电(香港)集团有限公司</span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;">地址：香港九龙长沙湾元洲街273-279号泰盛大厦2楼L026室</span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;">电话：852-30697060</span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;">传真：852-30697062</span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;">邮编：999077</span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;"><br/></span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;"><br/></span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 16px;"><br/></span></p><p style="margin-top: 0px; margin-bottom: 0px; line-height: 3em;"><span style="font-size: 18px;"><strong><span style="color: rgb(0, 0, 0);">亚洲 - 中国</span></strong></span></p><hr/><p style="margin-top: 0px; margin-bottom: 0px;">&nbsp;</p><p style="margin-top: 0px; margin-bottom: 0px; line-height: 2em;"><strong><span style="color: rgb(0, 0, 0); font-size: 14px;">步进电机事业部</span></strong></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;">深圳市英士达机电技术开发有限公司</span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;">地址：广东省深圳市宝安区西乡黄田工业城5栋6楼</span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;">电话：0755-83681167</span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;">传真：0755-83681143</span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;">邮编：518000</span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;">邮箱：sales@instar.com.cn</span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;"><br/></span></p><p style="margin-top: 0px; margin-bottom: 0px; line-height: 2em;"><span style="color: rgb(0, 0, 0);"><strong><span style="font-size: 14px;">技术支持</span></strong></span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;">电话：0755-83681167-209</span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;">邮箱：support@instar.com.cn</span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 16px;"><br/></span></p><p style="margin-top: 0px; margin-bottom: 0px; line-height: 2em;"><strong><span style="color: rgb(0, 0, 0); font-size: 14px;">伺服电机事业部</span></strong></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;">深圳市英士达电气有限公司</span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;">地址：广东省深圳市宝安区西乡黄田工业城5栋6楼</span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;">电话：0755-83681167</span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;">传真：0755-83681143</span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;">邮编：518000</span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;"><br/></span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;"><br/></span></p><p style="margin-top: 0px; margin-bottom: 0px; line-height: 2em;"><span style="color: rgb(0, 0, 0);"><strong><span style="font-size: 14px;">投诉服务</span></strong></span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;">电话：0755-83681167-206</span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;">邮箱：marketing@instar.com.cn</span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;"><br/></span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;"></span></p><p style="margin-top: 0px; margin-bottom: 0px; line-height: 2em;"><span style="font-size: 14px;">我们的投诉流程</span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;">&nbsp; &nbsp; &nbsp; &nbsp; 当我们收到您的投诉后，会于下两个工作天内确认收讫，并务求于七天内解决有关事宜。投诉资料将绝对保密，并交由具有合适经验及职权，但与投诉事项并无直接关联的职员处理。</span></p><p style="margin-top: 0px; margin-bottom: 0px;"><span style="font-size: 14px;">&nbsp; &nbsp; &nbsp; &nbsp; 我们致力确保所有投诉能圆满解决，但如我们的回覆未能令您满意，您有权将个案转交国家工商行政管理总局-消费者投诉中心(12315)处理。我们会全力与消费者投诉中心合作</span></p></ul><p><br/></p>', N'郭强煜', CAST(0x0000A73B00F2F1C0 AS DateTime), CAST(0x0000A73B00FD3194 AS DateTime), N'096550c0a4444d4a8773ab104eb6fa06.jpg', N'7f640d7155c7454280dd82722bd2e983.jpg', 1, NULL, NULL)
INSERT [dbo].[Company_Profile] ([ID], [Title], [Content], [CreatePeople], [CreateTime], [UpdateTime], [LogoUrl], [TextUrl], [Language], [Keywords], [Description]) VALUES (5, N'124', N'<p>3232434342</p>', N'', CAST(0x0000A74D00EC108C AS DateTime), CAST(0x0000A771017BEEE4 AS DateTime), N'', N'', 1, N'11111111111111111111111111111111111', N'郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜郭强煜')
SET IDENTITY_INSERT [dbo].[Company_Profile] OFF
SET IDENTITY_INSERT [dbo].[Contact_US] ON 

INSERT [dbo].[Contact_US] ([ID], [Title], [Department], [Company], [Address], [Phone], [Fax], [Postcode], [mailbox], [CreatePeople], [CreateTime], [UpdateTime], [BrowseTimes], [LogoUrl], [Language], [Keywords], [Description]) VALUES (1, N'自动包装机受追捧，市场潜力巨大', N'综合办', N'英士达机电(香港)集团有限公司', N'香港九龙长沙湾元洲街273-279号泰盛大厦2楼L026室', N'852-30697060', N'852-30697062', N'999077', N'sales@instar.com.cn', N'郭强煜', CAST(0x0000A73B00F22E0C AS DateTime), CAST(0x0000A73B00F22E0C AS DateTime), 0, N'd7eec2198b384c078cd35f0b2e6d3f93.jpg', NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Contact_US] OFF
SET IDENTITY_INSERT [dbo].[InBanner] ON 

INSERT [dbo].[InBanner] ([ID], [Title], [CreatePeople], [BannerPicname], [CreateTime], [UpdateTime], [Language], [Keywords], [Description]) VALUES (1, N'123', N'gqy', N'eede34dc-28ae-415d-b6a5-8f4b2e01bef5.jpg,6c62bd0f-f8e9-40f6-bd43-921a8c569472.jpg,b11d97fd-f721-40a3-9473-590140347356.jpg,ba49ded6-c3ff-494c-9e91-bb98a8d1e05e.jpg', CAST(0x0000A741011DAC08 AS DateTime), CAST(0x0000A741011DAC08 AS DateTime), NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[InBanner] OFF
SET IDENTITY_INSERT [dbo].[Industry_News] ON 

INSERT [dbo].[Industry_News] ([ID], [Title], [Content], [CreatePeople], [CreateTime], [UpdateTime], [BrowseTimes], [LogoUrl], [Language], [Keywords], [Description]) VALUES (1, N'自动包装机受追捧，市场潜力巨大', N'<ul style="color: rgb(102, 102, 102); font-family: Verdana, Helvetica, sans-serif; font-size: 12px; white-space: normal;"><p style="margin-top: 0px; margin-bottom: 0px; line-height: 2em;"><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 16px;">包装机械是包装工业的一大门类产品，在包装工业中有着举足轻重的地位和作用，它给行业提供必要的技术设备，以完成产品的包装工艺过程。尽管包装机械的产值在整个包装工业中所占的比重不如包装材料大，不属于经常性消耗品，但对包装工业的现代化却是不可缺少的支撑。没有现代化的包装机械，就没有现代化的包装工业。用于完成包装过程的包装机械可分为11类，它们是充填机械、灌装机械、封口机械、裹包机械、多功能包装机械、标签机械、清洗机械、干燥机械、杀菌机械、捆扎机械和集装机械、辅助包装机械和设备等。包装机械作为专业性机械，除了同于普通机械的一般要求外，还有外表美观、传动装置紧凑、运转平稳、精度高、生产效率高等要求，以很好地完成自身功能，适应市场需求。</span></p><p style="margin-top: 0px; margin-bottom: 0px;"><br/></p><p style="margin-top: 0px; margin-bottom: 0px; line-height: 2em;"><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 16px;">　　我国包装市场无论是高端产品还是低端技术，自动包装机都是极具发展潜力的一款包装机械。各行业的高速发展，也为自动包装机的发展提供了最佳的外部发展环境，随着科学技术的不断进步，也有越来越多的新技术被应用到了自动包装机之上，既使得自动包装机的性能得到了很大的完善，同时更重要的是自动包装机能够更好的为客户进行服务。人们的消费观念伴随着外部生活条件的改变，也在不断的发生着变化，因此商品的包装对人们的购买行为也能起到至关重要的影响，所以，很多企业都已经把关注的目光投向了自动包装机。</span></p><p style="margin-top: 0px; margin-bottom: 0px;"><br/></p><p style="margin-top: 0px; margin-bottom: 0px; line-height: 2em;"><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 16px;">　　但面对着日益变化的现代化新社会，我国的自动包装机生产企业也不会固步自封，而是不断的寻求新的突破点，强化自主创新意识，增强市场竞争意识，借以推动我国自动包装机行业的飞速发展，也唯有如此才能逐步的缩小与外国先进自动包装机企业之间的技术差距。嘉歆自动包装机公司作为目前国内最大的包装机械供应商之一，其也一直在紧跟市场发展潮流，不断的进行技术的创新，目前业已取得丰硕的成果。在我们的生活中，自动包装机以其特有的特点，改变着我们生活的点点滴滴，就是由于自动包装机的存在，人们的生活才会变得更加的多姿多彩。</span></p><p style="margin-top: 0px; margin-bottom: 0px;"><br/></p><p style="margin-top: 0px; margin-bottom: 0px; line-height: 2em;"><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 16px;">　　面对着市场上消费者对于包装的强烈追捧热潮，自动包装机也在迅速的走向成熟、完善，并一跃发展成为包装市场最具发展潜力的机械设备。伴随着技术的多样化，自动包装机也在朝着多样化的方向发展，并且功能在不断的增多，性能也不断的得到了完善，为更多的企业带去了发展的商机。面对市场不断增多的需求，嘉歆自动包装机也在悄然发生着蜕变，不断的加大创新发展的力度，并从国外学习先进的技术，取其精华去其糟泊，借以加速我国自动包装机企业的进步，并改变我国自动包装机性能不完善的现状。</span></p></ul><p><br/></p>', N'郭强煜', CAST(0x0000A73B00EC9988 AS DateTime), CAST(0x0000A73B00ECDB28 AS DateTime), 0, N'b9954467c4e44ad3a64cacfd4da59cc7.jpg', NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Industry_News] OFF
SET IDENTITY_INSERT [dbo].[InTeam] ON 

INSERT [dbo].[InTeam] ([ID], [Title], [Content1], [Content2], [Content3], [CreatePeople], [TeamPicname], [CreateTime], [UpdateTime], [Language], [Keywords], [Description]) VALUES (1, N'123', N'123', N'456', N'789', N'gqy', N'3ae2fd07-d57b-4332-9c6f-df19d1b6bd4b.jpg,a7b7d075-cf35-41f4-aec1-e7d59092c8cd.jpg,174361a0-6707-44ad-b840-2383e9db849e.jpg,6d08d6fd-d1e2-433c-b37b-7effe68438c0.jpg', CAST(0x0000A741011E09C8 AS DateTime), CAST(0x0000A741011E09C8 AS DateTime), NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[InTeam] OFF
SET IDENTITY_INSERT [dbo].[ProductCenter] ON 

INSERT [dbo].[ProductCenter] ([ID], [ProductID], [ProductTitle], [ProductType], [CreatePeople], [CreateTime], [UpdateTime], [LogoUrl], [Language], [Keywords], [Description]) VALUES (1, N'PC0017032100001', N'伺服驱动器', 1, N'郭强煜', CAST(0x0000A73D017D9780 AS DateTime), CAST(0x0000A76800C09626 AS DateTime), N'198e0a31598b462d9a1d14a3e1963617.jpg', 1, NULL, NULL)
INSERT [dbo].[ProductCenter] ([ID], [ProductID], [ProductTitle], [ProductType], [CreatePeople], [CreateTime], [UpdateTime], [LogoUrl], [Language], [Keywords], [Description]) VALUES (2, N'PC0017042700001', N'伺服电机', 2, N'郭强煜', CAST(0x0000A76200BA7C5F AS DateTime), CAST(0x0000A76200BA7C5F AS DateTime), N'4f32e341dded4a80abe87438d1f1bc47.jpeg', 1, NULL, NULL)
INSERT [dbo].[ProductCenter] ([ID], [ProductID], [ProductTitle], [ProductType], [CreatePeople], [CreateTime], [UpdateTime], [LogoUrl], [Language], [Keywords], [Description]) VALUES (6, N'PC0017050300001', N'伺服驱动器', 1, N'gqy', CAST(0x0000A76800C0263E AS DateTime), CAST(0x0000A76800C08356 AS DateTime), N'3c23feb504e34469a8a84ac3050224f1.jpg', 2, NULL, NULL)
SET IDENTITY_INSERT [dbo].[ProductCenter] OFF
SET IDENTITY_INSERT [dbo].[ProductCenterDetail] ON 

INSERT [dbo].[ProductCenterDetail] ([ID], [ProductDetailID], [ProductModelID], [Title], [Series], [ClothAngle], [Advantage], [TechnicalParameter], [CreatePeople], [CreateTime], [UpdateTime], [LogoUrl], [FileName], [Language], [Keywords], [Description]) VALUES (2, N'PD0017032200001', N'PM0017032200007', N'伺服驱动器详情', N'123', N'123', N'<p>123456</p>', N'<p>123456</p>', N'gqy', CAST(0x0000A73E010F77B4 AS DateTime), CAST(0x0000A74D00FB3A66 AS DateTime), N'374864edd70846fba72c0d065318eadf.jpg', N'99c8bfa5cca24dfca2243f5a131069b9.pdf', 1, NULL, NULL)
INSERT [dbo].[ProductCenterDetail] ([ID], [ProductDetailID], [ProductModelID], [Title], [Series], [ClothAngle], [Advantage], [TechnicalParameter], [CreatePeople], [CreateTime], [UpdateTime], [LogoUrl], [FileName], [Language], [Keywords], [Description]) VALUES (3, N'PD0017032400001', N'PM0017032200001', N'123456', N'123', N'123', N'<p>123313</p>', N'<p>133131</p>', N'gqyy', CAST(0x0000A74000A430D0 AS DateTime), CAST(0x0000A74D00FB097A AS DateTime), N'1a8b0fa6d0de429f9a6c3781a0ecb118.jpg', N'45acb376-9fdc-4269-a848-92c337b66ccc.xlsx,8c9c6670-0a27-4b69-b4b2-fa08a7bd9d91.xlsx', 1, NULL, NULL)
INSERT [dbo].[ProductCenterDetail] ([ID], [ProductDetailID], [ProductModelID], [Title], [Series], [ClothAngle], [Advantage], [TechnicalParameter], [CreatePeople], [CreateTime], [UpdateTime], [LogoUrl], [FileName], [Language], [Keywords], [Description]) VALUES (4, N'PD0017032500001', N'PM0017032200001', N'123', N'1213', N'133', N'<p>1331</p>', N'<p>1331</p>', N'gqy', CAST(0x0000A741011EDCB8 AS DateTime), CAST(0x0000A74D00FAFAF1 AS DateTime), N'dbf5e60331e94b81b7cb780dc26f2c44.jpeg', N'0e7e2185-ef87-4145-b166-40973b48227a.pdf,25adcf81-99f4-4998-9d0c-42390aa8830a.pdf', 1, NULL, NULL)
INSERT [dbo].[ProductCenterDetail] ([ID], [ProductDetailID], [ProductModelID], [Title], [Series], [ClothAngle], [Advantage], [TechnicalParameter], [CreatePeople], [CreateTime], [UpdateTime], [LogoUrl], [FileName], [Language], [Keywords], [Description]) VALUES (7, N'PD0017033100001', N'PM0017032200003', N'123456', N'3455', N'54454', N'<p>1:efdfdfdf</p>', N'<p style="padding-top: 10px; padding-bottom: 10px; margin-top: 0px; margin-bottom: 0px; word-break: break-all; word-wrap: break-word; white-space: normal; color: rgb(25, 25, 25); font-stretch: normal; font-size: 18px; line-height: 39px; font-family: &quot;Microsoft YaHei&quot;, 仿宋, 宋体; widows: 1;">省人力资源社会保障厅等十二部门春节前在全省组织开展农民工工资支付情况专项检查，此次检查的重点和目标都有哪些？用人单位拒不支付劳动报酬，劳动者如何维权？明年起，不再将外语水平与职称评审挂钩，取消职称计算机应用能力要求，江苏的具体政策是如何调整的？今天(6日)上午，江苏省人力资源和社会保障厅12333业务负责人任鹏连线《政风热线》为您详细解读。</p><p style="padding-top: 10px; padding-bottom: 10px; margin-top: 0px; margin-bottom: 0px; word-break: break-all; word-wrap: break-word; white-space: normal; color: rgb(25, 25, 25); font-stretch: normal; font-size: 18px; line-height: 39px; font-family: &quot;Microsoft YaHei&quot;, 仿宋, 宋体; widows: 1;">　　<strong style="word-break: break-all; word-wrap: break-word;">近期全省开展农民工工资支付情况专项检查 涉及建设施工等多个行业 特别是政府投资工程项目</strong></p><p style="padding-top: 10px; padding-bottom: 10px; margin-top: 0px; margin-bottom: 0px; word-break: break-all; word-wrap: break-word; white-space: normal; color: rgb(25, 25, 25); font-stretch: normal; font-size: 18px; line-height: 39px; font-family: &quot;Microsoft YaHei&quot;, 仿宋, 宋体; widows: 1;">　　省人力资源社会保障厅、省发展改革委员会、省公安厅、省司法厅等十二部门从2016年11月15日至2017年春节前在全省组织开展农民工工资支付情况专项检查。任鹏介绍，专项检查的重点包括招用农民工较多的建筑市政、交通运输、水利等建设施工企业以及加工制造、船舶修造、餐饮服务等中小型劳动密集型企业、个体工商户，特别是政府投资工程项目建设施工企业及钢铁、煤炭等产能过剩行业等企业农民工工资支付情况。</p><p style="padding-top: 10px; padding-bottom: 10px; margin-top: 0px; margin-bottom: 0px; word-break: break-all; word-wrap: break-word; white-space: normal; color: rgb(25, 25, 25); font-stretch: normal; font-size: 18px; line-height: 39px; font-family: &quot;Microsoft YaHei&quot;, 仿宋, 宋体; widows: 1;">　　通过专项检查，确保治欠保支工作取得明显成效，实现春节前拖欠农民工工资案件及涉及人数明显下降、因拖欠工资引发的群体性事件数量明显下降，确保发生的拖欠农民工工资案件基本结案、群体性事件得到妥善处置、涉嫌拒不支付劳动报酬罪案件及时移交司法处理，切实维护广大劳动者的工资报酬权益和社会和谐稳定。</p><p style="padding-top: 10px; padding-bottom: 10px; margin-top: 0px; margin-bottom: 0px; word-break: break-all; word-wrap: break-word; white-space: normal; color: rgb(25, 25, 25); font-stretch: normal; font-size: 18px; line-height: 39px; font-family: &quot;Microsoft YaHei&quot;, 仿宋, 宋体; widows: 1;">　　如果用人单位拒不支付劳动报酬，任鹏表示，劳动者可通过三种渠道进行维权。1、拨打全省联动劳动保障举报投诉电话12333转5号键进行举报投诉；2、登录江苏省人力资源和社会保障网全省劳动保障监察网上联动举报投诉平台进行举报投诉；3、向有管辖权的劳动保障监察机构进行举报投诉。</p><p style="padding-top: 10px; padding-bottom: 10px; margin-top: 0px; margin-bottom: 0px; word-break: break-all; word-wrap: break-word; white-space: normal; color: rgb(25, 25, 25); font-stretch: normal; font-size: 18px; line-height: 39px; font-family: &quot;Microsoft YaHei&quot;, 仿宋, 宋体; widows: 1;">　　<strong style="word-break: break-all; word-wrap: break-word;">工作时间内外出因从事与工作无关的事而受伤 不能算工伤</strong></p><p style="padding-top: 10px; padding-bottom: 10px; margin-top: 0px; margin-bottom: 0px; word-break: break-all; word-wrap: break-word; white-space: normal; color: rgb(25, 25, 25); text-align: center; font-stretch: normal; font-size: 18px; line-height: 39px; font-family: &quot;Microsoft YaHei&quot;, 仿宋, 宋体; widows: 1;"></p><div align="center" style="word-break: break-all; word-wrap: break-word; white-space: normal; color: rgb(25, 25, 25); font-stretch: normal; font-size: 18px; line-height: 32px; font-family: &quot;Microsoft YaHei&quot;, 仿宋, 宋体; widows: 1;"><span style="word-break: break-all; word-wrap: break-word;"><img border="0" src="http://pic.jschina.com.cn/003/003/589/00300358900_51262252.jpg" style="word-break: break-all; word-wrap: break-word; border-width: medium; max-width: 100%; border-style: none;"/></span></div><p style="padding-top: 10px; padding-bottom: 10px; margin-top: 0px; margin-bottom: 0px; word-break: break-all; word-wrap: break-word; white-space: normal; color: rgb(25, 25, 25); text-align: center; font-stretch: normal; font-size: 18px; line-height: 39px; font-family: &quot;Microsoft YaHei&quot;, 仿宋, 宋体; widows: 1;"></p><p style="padding-top: 10px; padding-bottom: 10px; margin-top: 0px; margin-bottom: 0px; word-break: break-all; word-wrap: break-word; white-space: normal; color: rgb(25, 25, 25); font-stretch: normal; font-size: 18px; line-height: 39px; font-family: &quot;Microsoft YaHei&quot;, 仿宋, 宋体; widows: 1;">　　近期，省人社厅出台了《省人力资源和社会保障厅关于实施《工伤保险条例》若干问题的处理意见》。新《处理意见》针对公众关注的工伤认定情形作出了相应解释，如“工作时间”、“工作场所”、“因工外出期间”和“上下班途中”等。</p><p style="padding-top: 10px; padding-bottom: 10px; margin-top: 0px; margin-bottom: 0px; word-break: break-all; word-wrap: break-word; white-space: normal; color: rgb(25, 25, 25); font-stretch: normal; font-size: 18px; line-height: 39px; font-family: &quot;Microsoft YaHei&quot;, 仿宋, 宋体; widows: 1;">　　“工作时间”，包括职工劳动合同约定的工作时间或者用人单位规定的工作时间以及加班加点的工作时间。“工作场所”，既包括用人单位能够对从事日常生产经营活动进行有效管理的区域，也包括职工为完成某项特定工作所涉及的单位以外的相关区域，还包括职工因工作来往于多个与其工作职责相关的工作场所之间的合理区域。“因工外出期间”，是指职工受用人单位指派或者根据工作岗位性质要求自行到工作场所以外从事与工作职责有关活动的期间。</p><p style="padding-top: 10px; padding-bottom: 10px; margin-top: 0px; margin-bottom: 0px; word-break: break-all; word-wrap: break-word; white-space: normal; color: rgb(25, 25, 25); font-stretch: normal; font-size: 18px; line-height: 39px; font-family: &quot;Microsoft YaHei&quot;, 仿宋, 宋体; widows: 1;">　　用人单位安排或者组织职工参加文体活动，应作为工作原因。用人单位以工作名义安排或者组织职工参加餐饮、旅游观光、休闲娱乐等活动，或者从事涉及领导、个人私利的活动，不能作为工作原因。职工因工外出期间从事与工作职责无关的活动受到伤害的，不能作为工作原因。</p><p style="padding-top: 10px; padding-bottom: 10px; margin-top: 0px; margin-bottom: 0px; word-break: break-all; word-wrap: break-word; white-space: normal; color: rgb(25, 25, 25); font-stretch: normal; font-size: 18px; line-height: 39px; font-family: &quot;Microsoft YaHei&quot;, 仿宋, 宋体; widows: 1;">　　“上下班途中”包括：1、在合理时间内往返于工作地与经常居住地之间合理路线的上下班途中；2，在合理时间内往返于工作地与配偶、父母、子女居住地的合理路线的上下班途中；3，从事属于日常工作生活所需要的活动，且在合理时间和合理路线的上下班途中。</p><p style="padding-top: 10px; padding-bottom: 10px; margin-top: 0px; margin-bottom: 0px; word-break: break-all; word-wrap: break-word; white-space: normal; color: rgb(25, 25, 25); font-stretch: normal; font-size: 18px; line-height: 39px; font-family: &quot;Microsoft YaHei&quot;, 仿宋, 宋体; widows: 1;">　　<strong style="word-break: break-all; word-wrap: break-word;">外语、计算机不再与职称评审挂钩</strong><strong style="word-break: break-all; word-wrap: break-word;">&nbsp;考试成绩将纳入专业技术人员继续教育内容</strong></p><p style="padding-top: 10px; padding-bottom: 10px; margin-top: 0px; margin-bottom: 0px; word-break: break-all; word-wrap: break-word; white-space: normal; color: rgb(25, 25, 25); text-align: center; font-stretch: normal; font-size: 18px; line-height: 39px; font-family: &quot;Microsoft YaHei&quot;, 仿宋, 宋体; widows: 1;"></p><div align="center" style="word-break: break-all; word-wrap: break-word; white-space: normal; color: rgb(25, 25, 25); font-stretch: normal; font-size: 18px; line-height: 32px; font-family: &quot;Microsoft YaHei&quot;, 仿宋, 宋体; widows: 1;"><span style="word-break: break-all; word-wrap: break-word;"><img border="0" src="http://pic.jschina.com.cn/003/003/588/00300358898_d618cc5f.jpg" width="475" height="377" style="word-break: break-all; word-wrap: break-word; border-width: medium; max-width: 100%; border-style: none;"/></span></div><p style="padding-top: 10px; padding-bottom: 10px; margin-top: 0px; margin-bottom: 0px; word-break: break-all; word-wrap: break-word; white-space: normal; color: rgb(25, 25, 25); text-align: center; font-stretch: normal; font-size: 18px; line-height: 39px; font-family: &quot;Microsoft YaHei&quot;, 仿宋, 宋体; widows: 1;"></p><p style="padding-top: 10px; padding-bottom: 10px; margin-top: 0px; margin-bottom: 0px; word-break: break-all; word-wrap: break-word; white-space: normal; color: rgb(25, 25, 25); font-stretch: normal; font-size: 18px; line-height: 39px; font-family: &quot;Microsoft YaHei&quot;, 仿宋, 宋体; widows: 1;">　　日前，省人力资源和社会保障厅出台《关于调整我省职称外语和计算机应用能力政策有关问题的通知》，明确从2017年1月1日起，不再将外语水平与职称评审挂钩，取消职称计算机应用能力要求，聚力人才发展体制机制改革创新，努力为人才松绑。</p><p style="padding-top: 10px; padding-bottom: 10px; margin-top: 0px; margin-bottom: 0px; word-break: break-all; word-wrap: break-word; white-space: normal; color: rgb(25, 25, 25); font-stretch: normal; font-size: 18px; line-height: 39px; font-family: &quot;Microsoft YaHei&quot;, 仿宋, 宋体; widows: 1;">　　任鹏介绍，专业技术人员申报评审我省各类专业技术资格，对职称外语水平原则上不作要求。对县及以下基层单位、年龄满50周岁的、已取得硕士及以上学历(学位)或外语专业大学专科及以上学历的专业技术人员，对外语水平要求不高的系列(专业)，一律不得将职称外语作为申报和评审的必备条件。确实需要评价外语水平的，不得作为申报必备条件，可作为评审时的参考因素，按评审权限事先报经同级政府人力资源社会保障部门备案同意，并向社会公开。</p><p style="padding-top: 10px; padding-bottom: 10px; margin-top: 0px; margin-bottom: 0px; word-break: break-all; word-wrap: break-word; white-space: normal; color: rgb(25, 25, 25); font-stretch: normal; font-size: 18px; line-height: 39px; font-family: &quot;Microsoft YaHei&quot;, 仿宋, 宋体; widows: 1;">　　同时，专业技术人员申报评审我省各类专业技术资格，不论层级、不论单位性质，一律不得将计算机应用能力作为职称申报和评审的必备条件。</p><p style="padding-top: 10px; padding-bottom: 10px; margin-top: 0px; margin-bottom: 0px; word-break: break-all; word-wrap: break-word; white-space: normal; color: rgb(25, 25, 25); font-stretch: normal; font-size: 18px; line-height: 39px; font-family: &quot;Microsoft YaHei&quot;, 仿宋, 宋体; widows: 1;">　　此外，我省不断鼓励专业技术人才加强外语和计算机的知识更新。引导广大专业技术人员通过多种方式和手段，不断提升外语水平和计算机应用能力，将职称外语、计算机应用能力考试成绩纳入专业技术人员继续教育内容，由专业技术人员自主自愿选择参加国家承认的各类考试，考试合格可登记当年的继续教育公需科目学时学分。</p><p><br/></p>', N'gqy', CAST(0x0000A74701332A07 AS DateTime), CAST(0x0000A74D00FAD869 AS DateTime), N'3ed92bb2c78c4ac29b1991d6fe5b313b.jpeg', N'8eff817a96af46479a5a652eb1f17914.pdf', 1, NULL, NULL)
INSERT [dbo].[ProductCenterDetail] ([ID], [ProductDetailID], [ProductModelID], [Title], [Series], [ClothAngle], [Advantage], [TechnicalParameter], [CreatePeople], [CreateTime], [UpdateTime], [LogoUrl], [FileName], [Language], [Keywords], [Description]) VALUES (9, N'PD0017042700001', N'PM0017032200001', N'伺服驱动器详情', N'123', N'123', N'<p>4555555555555555fggggdgghhii</p>', N'<p>dbhbfvhh34343434343434343434343434gghhii</p>', N'', CAST(0x0000A76200C2A69F AS DateTime), CAST(0x0000A77200BF9137 AS DateTime), N'4c7dd488548c43daa7b028c128e8ba5c.jpg', N'b3151ae73e9244acac07252ae0539068.dwg,8f3a7a722fa94568a5eb3b077be7a1b3.igs', 1, N'guoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyu', N'guoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyuguoqiaingyu')
SET IDENTITY_INSERT [dbo].[ProductCenterDetail] OFF
SET IDENTITY_INSERT [dbo].[ProductCenterModel] ON 

INSERT [dbo].[ProductCenterModel] ([ID], [ProductModelID], [ProductID], [ProductModel], [CreateTime], [UpdateTime], [Language]) VALUES (5, N'PM0017032200001', N'PC0017032100001', N'11', CAST(0x0000A73E00027C54 AS DateTime), CAST(0x0000A73E00027C54 AS DateTime), 1)
INSERT [dbo].[ProductCenterModel] ([ID], [ProductModelID], [ProductID], [ProductModel], [CreateTime], [UpdateTime], [Language]) VALUES (6, N'PM0017032200002', N'PC0017032100001', N'22', CAST(0x0000A73E00027D80 AS DateTime), CAST(0x0000A73E00027D80 AS DateTime), 1)
INSERT [dbo].[ProductCenterModel] ([ID], [ProductModelID], [ProductID], [ProductModel], [CreateTime], [UpdateTime], [Language]) VALUES (7, N'PM0017032200003', N'PC0017032100001', N'33', CAST(0x0000A73E00027EAC AS DateTime), CAST(0x0000A73E00027EAC AS DateTime), 1)
INSERT [dbo].[ProductCenterModel] ([ID], [ProductModelID], [ProductID], [ProductModel], [CreateTime], [UpdateTime], [Language]) VALUES (8, N'PM0017032200004', N'PC0017032100001', N'44', CAST(0x0000A73E00028104 AS DateTime), CAST(0x0000A73E00028104 AS DateTime), 1)
INSERT [dbo].[ProductCenterModel] ([ID], [ProductModelID], [ProductID], [ProductModel], [CreateTime], [UpdateTime], [Language]) VALUES (9, N'PM0017032200005', N'PC0017032100001', N'55', CAST(0x0000A73E00028230 AS DateTime), CAST(0x0000A73E00028230 AS DateTime), 1)
INSERT [dbo].[ProductCenterModel] ([ID], [ProductModelID], [ProductID], [ProductModel], [CreateTime], [UpdateTime], [Language]) VALUES (10, N'PM0017032200006', N'PC0017032100001', N'66', CAST(0x0000A73E0002835C AS DateTime), CAST(0x0000A73E0002835C AS DateTime), 1)
INSERT [dbo].[ProductCenterModel] ([ID], [ProductModelID], [ProductID], [ProductModel], [CreateTime], [UpdateTime], [Language]) VALUES (11, N'PM0017032200007', N'PC0017032100001', N'77', CAST(0x0000A73E00047694 AS DateTime), CAST(0x0000A73E00047694 AS DateTime), 1)
INSERT [dbo].[ProductCenterModel] ([ID], [ProductModelID], [ProductID], [ProductModel], [CreateTime], [UpdateTime], [Language]) VALUES (12, N'PM0017032200008', N'PC0017032100001', N'88', CAST(0x0000A73E000477C0 AS DateTime), CAST(0x0000A73E000477C0 AS DateTime), 1)
INSERT [dbo].[ProductCenterModel] ([ID], [ProductModelID], [ProductID], [ProductModel], [CreateTime], [UpdateTime], [Language]) VALUES (14, N'PM0017042700001', N'PC0017042700001', N'160mm', CAST(0x0000A76200BA839D AS DateTime), CAST(0x0000A76200BA839D AS DateTime), 1)
INSERT [dbo].[ProductCenterModel] ([ID], [ProductModelID], [ProductID], [ProductModel], [CreateTime], [UpdateTime], [Language]) VALUES (15, N'PM0017042700002', N'PC0017042700001', N'170mm', CAST(0x0000A76200BA83A0 AS DateTime), CAST(0x0000A76200BA83A0 AS DateTime), 1)
INSERT [dbo].[ProductCenterModel] ([ID], [ProductModelID], [ProductID], [ProductModel], [CreateTime], [UpdateTime], [Language]) VALUES (21, N'PM0017050300005', N'PC0017032100001', N'180mm', CAST(0x0000A76800B61D43 AS DateTime), CAST(0x0000A76800B61D43 AS DateTime), 1)
INSERT [dbo].[ProductCenterModel] ([ID], [ProductModelID], [ProductID], [ProductModel], [CreateTime], [UpdateTime], [Language]) VALUES (22, N'PM0017050300006', N'PC0017032100001', N'170mm', CAST(0x0000A76800B61D48 AS DateTime), CAST(0x0000A76800B61D48 AS DateTime), 1)
INSERT [dbo].[ProductCenterModel] ([ID], [ProductModelID], [ProductID], [ProductModel], [CreateTime], [UpdateTime], [Language]) VALUES (24, N'PM0017050300007', N'PC0017050300001', N'180mm', CAST(0x0000A76800C0266D AS DateTime), CAST(0x0000A76800C0266D AS DateTime), 2)
SET IDENTITY_INSERT [dbo].[ProductCenterModel] OFF
SET IDENTITY_INSERT [dbo].[ProductRelation] ON 

INSERT [dbo].[ProductRelation] ([ID], [ProductDetailID], [RelatinProductDetailID]) VALUES (47, N'PD0017042700001', N'PD0017032400001')
INSERT [dbo].[ProductRelation] ([ID], [ProductDetailID], [RelatinProductDetailID]) VALUES (48, N'PD0017042700001', N'PD0017032500001')
SET IDENTITY_INSERT [dbo].[ProductRelation] OFF
SET IDENTITY_INSERT [dbo].[Recruitment] ON 

INSERT [dbo].[Recruitment] ([ID], [Title], [CreatePeople], [CreateTime], [UpdateTime], [BrowseTimes], [LogoUrl], [Department], [Number], [Responsibilities], [JobRequirements], [Salary], [Language], [Keywords], [Description]) VALUES (1, N'前台文员', N'郭强煜', CAST(0x0000A73B00EF7AA4 AS DateTime), CAST(0x0000A73B0115EAE0 AS DateTime), 0, N'c573437eedd04db196aededd2fba7171.jpg', N'综合办', 1, N'<p style="margin-top: 0px; margin-bottom: 0px; color: rgb(102, 102, 102); font-family: Verdana, Helvetica, sans-serif; font-size: 12px; white-space: normal;"><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">1、负责前台电话的接听和转接，做好来电咨询工作，重要事项认真记录并传达给相关人员，不遗漏、不延误；</span></p><p style="margin-top: 0px; margin-bottom: 0px; color: rgb(102, 102, 102); font-family: Verdana, Helvetica, sans-serif; font-size: 12px; white-space: normal;"><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">2、负责来访客户的接待、基本咨询和引见，严格执行公司的接待服务规范，保持良好的礼节礼貌；</span></p><p style="margin-top: 0px; margin-bottom: 0px; color: rgb(102, 102, 102); font-family: Verdana, Helvetica, sans-serif; font-size: 12px; white-space: normal;"><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">3、负责办公区域的环境维护；</span></p><p style="margin-top: 0px; margin-bottom: 0px; color: rgb(102, 102, 102); font-family: Verdana, Helvetica, sans-serif; font-size: 12px; white-space: normal;"><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">4、协助组织实施招聘工作，更新每月职位空缺，筛选简历并组织面试；</span></p><p style="margin-top: 0px; margin-bottom: 0px; color: rgb(102, 102, 102); font-family: Verdana, Helvetica, sans-serif; font-size: 12px; white-space: normal;"><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">5、完成领导交办的其他工作。</span></p><p><br/></p>', N'<p style="margin-top: 0px; margin-bottom: 0px; color: rgb(102, 102, 102); font-family: Verdana, Helvetica, sans-serif; font-size: 12px; white-space: normal;"><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">1、女性，18-25岁，身高160cm以上，中专及以上学历；</span></p><p style="margin-top: 0px; margin-bottom: 0px; color: rgb(102, 102, 102); font-family: Verdana, Helvetica, sans-serif; font-size: 12px; white-space: normal;"><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">2、性格开朗随和，形象好、待人热情、有亲和力，懂得来电及来访接待礼仪；</span></p><p style="margin-top: 0px; margin-bottom: 0px; color: rgb(102, 102, 102); font-family: Verdana, Helvetica, sans-serif; font-size: 12px; white-space: normal;"><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">3、普通话标准，具有良好的语言表达和文字撰写能力，良好的逻辑思维能力；</span></p><p style="margin-top: 0px; margin-bottom: 0px; color: rgb(102, 102, 102); font-family: Verdana, Helvetica, sans-serif; font-size: 12px; white-space: normal;"><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">4、熟悉使用OFFICE等办公软件、熟悉网络应用、使用各种办公自动化设备，工作认真负责，对待繁琐的工作耐心仔细；</span></p><p style="margin-top: 0px; margin-bottom: 0px; color: rgb(102, 102, 102); font-family: Verdana, Helvetica, sans-serif; font-size: 12px; white-space: normal;"><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">5、具有一定的组织协调能力、思维敏捷，应变能力强。</span></p><p><br/></p>', N'3500~4200', NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Recruitment] OFF
SET IDENTITY_INSERT [dbo].[Service_Concept] ON 

INSERT [dbo].[Service_Concept] ([ID], [Title], [Content], [CreatePeople], [CreateTime], [UpdateTime], [LogoUrl], [Language], [Keywords], [Description]) VALUES (1, N'专业1', N'<p><span style="color: rgb(102, 102, 102); font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 18px; white-space: normal;">“专业”是英士达品牌价值的核心诉求。我司将坚持“用责任打造品牌”、“认真做好每一件事”的专业精神，着力提高人员技能和素养，力求将服务效率和品质落实到实处，让客户真正体验优质的专业服务。</span></p>', N'郭强煜', CAST(0x0000A73B00ED1DF4 AS DateTime), CAST(0x0000A73B00ED2AD8 AS DateTime), N'5282df5442874b93ba2c21511fbe1875.jpg', NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Service_Concept] OFF
SET IDENTITY_INSERT [dbo].[Staff_Presence] ON 

INSERT [dbo].[Staff_Presence] ([ID], [Title], [Content], [CreatePeople], [CreateTime], [UpdateTime], [LogoUrl], [Language], [Keywords], [Description]) VALUES (1, N'员工风采', N'<p>员工风采1</p>', N'郭强煜', CAST(0x0000A73B00EFA600 AS DateTime), CAST(0x0000A73B00EFB668 AS DateTime), N'36cb7680308d4a1e866d52ec651bbfcf.jpg', NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Staff_Presence] OFF
SET IDENTITY_INSERT [dbo].[SysUser] ON 

INSERT [dbo].[SysUser] ([ID], [UserID], [UserName], [PassWord], [Phone], [CreateTime], [UpdateTime], [Language]) VALUES (1, NULL, N'admin', N'123456', NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[SysUser] OFF
SET IDENTITY_INSERT [dbo].[Talent_Concept] ON 

INSERT [dbo].[Talent_Concept] ([ID], [Title], [Content], [CreatePeople], [CreateTime], [UpdateTime], [LogoUrl], [Language], [Keywords], [Description]) VALUES (1, N'诚实', N'<p><span style="color: rgb(102, 102, 102); font-family: Verdana, Helvetica, sans-serif; font-size: 18px; white-space: normal;">&nbsp;“人无信不立 ，企无信难存”，一个人的诚实与否能够真实体现其待人处事的态度，反映其个人品性，直接影响团队合作过程中的彼此信任度与凝聚力。英士达机电重视员工秉承诚实守信的营销理念，做到对企业，对消费者负责。只有诚实守信才能赢得客户的信赖，赢得市场，赢得一种长期的可持续发展的格局。</span></p>', N'郭强煜', CAST(0x0000A73B00EE0F5C AS DateTime), CAST(0x0000A73B00EE1B14 AS DateTime), N'5ce78648a1724a3da8979897164808bc.jpg', NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Talent_Concept] OFF
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO关键字' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CommonQuestion', @level2type=N'COLUMN',@level2name=N'Keywords'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO内容' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CommonQuestion', @level2type=N'COLUMN',@level2name=N'Description'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO关键字' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Company_Culture', @level2type=N'COLUMN',@level2name=N'Keywords'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO内容' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Company_Culture', @level2type=N'COLUMN',@level2name=N'Description'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO关键字' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Company_History', @level2type=N'COLUMN',@level2name=N'Keywords'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO内容' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Company_History', @level2type=N'COLUMN',@level2name=N'Description'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO关键字' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Company_Honor', @level2type=N'COLUMN',@level2name=N'Keywords'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO内容' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Company_Honor', @level2type=N'COLUMN',@level2name=N'Description'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO关键字' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Company_Location', @level2type=N'COLUMN',@level2name=N'Keywords'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO内容' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Company_Location', @level2type=N'COLUMN',@level2name=N'Description'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO关键字' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Company_News', @level2type=N'COLUMN',@level2name=N'Keywords'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO内容' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Company_News', @level2type=N'COLUMN',@level2name=N'Description'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO关键字' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Company_Profile', @level2type=N'COLUMN',@level2name=N'Keywords'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO内容' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Company_Profile', @level2type=N'COLUMN',@level2name=N'Description'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO关键字' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Contact_US', @level2type=N'COLUMN',@level2name=N'Keywords'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO内容' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Contact_US', @level2type=N'COLUMN',@level2name=N'Description'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO关键字' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'InBanner', @level2type=N'COLUMN',@level2name=N'Keywords'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO内容' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'InBanner', @level2type=N'COLUMN',@level2name=N'Description'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO关键字' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Industry_News', @level2type=N'COLUMN',@level2name=N'Keywords'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO内容' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Industry_News', @level2type=N'COLUMN',@level2name=N'Description'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO关键字' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'InTeam', @level2type=N'COLUMN',@level2name=N'Keywords'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO内容' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'InTeam', @level2type=N'COLUMN',@level2name=N'Description'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO关键字' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ProductCenter', @level2type=N'COLUMN',@level2name=N'Keywords'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO内容' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ProductCenter', @level2type=N'COLUMN',@level2name=N'Description'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'技术参数' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ProductCenterDetail', @level2type=N'COLUMN',@level2name=N'TechnicalParameter'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO关键字' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ProductCenterDetail', @level2type=N'COLUMN',@level2name=N'Keywords'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO内容' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ProductCenterDetail', @level2type=N'COLUMN',@level2name=N'Description'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'产品详情ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ProductRelation', @level2type=N'COLUMN',@level2name=N'ProductDetailID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'关联的产品详情ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ProductRelation', @level2type=N'COLUMN',@level2name=N'RelatinProductDetailID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'招聘岗位' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Recruitment', @level2type=N'COLUMN',@level2name=N'Title'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO关键字' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Recruitment', @level2type=N'COLUMN',@level2name=N'Keywords'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO内容' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Recruitment', @level2type=N'COLUMN',@level2name=N'Description'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO关键字' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Service_Concept', @level2type=N'COLUMN',@level2name=N'Keywords'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO内容' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Service_Concept', @level2type=N'COLUMN',@level2name=N'Description'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO关键字' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Staff_Presence', @level2type=N'COLUMN',@level2name=N'Keywords'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO内容' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Staff_Presence', @level2type=N'COLUMN',@level2name=N'Description'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO关键字' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Talent_Concept', @level2type=N'COLUMN',@level2name=N'Keywords'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SEO内容' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Talent_Concept', @level2type=N'COLUMN',@level2name=N'Description'
GO
