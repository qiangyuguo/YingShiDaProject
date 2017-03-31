using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace YingShiDa
{
    public partial class ValiCode : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            string tmp = RndNum(4);
            HttpCookie cooke = new HttpCookie("valicode ", tmp);
            Response.Cookies.Add(cooke);
            //System.Web.HttpContext.Current.Session["valicode"] = tmp;
            this.ValidateCode(tmp);

        }

        private void ValidateCode(string VNum)
        {
            Bitmap Img = null;
            Graphics gra = null;
            MemoryStream ms = null;
            int gheight = VNum.Length * 12;
            Img = new Bitmap(gheight, 25);
            gra = Graphics.FromImage(Img);
            Random random = new Random();
            gra.Clear(Color.DarkSlateGray);
            for (int i = 0; i < 100; i++)
            {

                int x = random.Next(Img.Width);
                int y = random.Next(Img.Height);
                Img.SetPixel(x, y, Color.FromArgb(random.Next()));
            }
            Font font = new Font("Arial   Black ", 12, FontStyle.Regular);


            SolidBrush soli = new SolidBrush(Color.White);
            gra.DrawString(VNum, font, soli, 3, 3);
            ms = new MemoryStream();
            Img.Save(ms, ImageFormat.Jpeg);
            Response.ClearContent();
            Response.ContentType = "image/Jpeg ";
            Response.BinaryWrite(ms.ToArray());
            gra.Dispose();
            Img.Dispose();
            Response.End();
        }




        private string RndNum(int VcodeNum)
        {
            string Vchar = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p" +
            ",q,r,s,t,u,v,w,x,y,z";
            string[] VcArray = Vchar.Split(new Char[] { ',' });
            string VNum ="";
            int temp = -1;
            Random rand = new Random();
            for (int i = 1; i < VcodeNum + 1; i++)
            {
                if (temp != -1)
                {
                    rand = new Random(i * temp * unchecked((int)DateTime.Now.Ticks));

                }
                int t = rand.Next(35);
                if (temp != -1 && temp == t)
                {
                    return RndNum(VcodeNum);
                }
                temp = t;

                VNum += VcArray[t];
            }
            return VNum;

        }

    }
}