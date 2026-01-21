import { Resend } from 'resend';
import { WelcomeEmail } from '@/components/emails/WelcomeEmail';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, firstName, isReport, customMessage } = await request.json();

    // Dinamik başlık mantığı
    let subject = "";
    if (customMessage) {
      subject = "Carvix - Şifre Sıfırlama Talebi";
    } else if (isReport) {
      subject = "Carvix - Araç Analiz Raporunuz Hazır!";
    } else {
      subject = "Carvix - Hesabınız Başarıyla Oluşturuldu";
    }

    const data = await resend.emails.send({
      from: 'Carvix <onboarding@resend.dev>',
      to: [email],
      subject: subject,
      // 1. Senaryo: Eğer özel bir mesaj varsa (Şifre Sıfırlama)
      html: customMessage 
        ? `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; background-color: #f9f9f9; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; padding: 30px; border: 1px solid #eeeeee; box-shadow: 0 10px 20px rgba(0,0,0,0.05);">
              <div style="text-align: center; margin-bottom: 20px;">
                <div style="background-color: #3b82f6; width: 50px; height: 50px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 24px;">C</div>
                <h2 style="color: #111; margin-top: 15px;">Şifre Sıfırlama Talebi</h2>
              </div>
              <p style="font-size: 16px; line-height: 1.6;">Merhaba,</p>
              <p style="font-size: 16px; line-height: 1.6;">Hesabınız için şifre sıfırlama talebinde bulundunuz. Yeni geçici şifreniz aşağıdadır:</p>
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 12px; text-align: center; margin: 25px 0; border: 1px dashed #3b82f6;">
                <span style="font-family: monospace; font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #1d4ed8;">${customMessage}</span>
              </div>
              <p style="font-size: 14px; color: #666; margin-bottom: 30px;">Not: Güvenliğiniz için giriş yaptıktan sonra Hesap Ayarları sayfasından şifrenizi değiştirmeyi unutmayın.</p>
              <div style="text-align: center;">
                <a href="https://www.carvix.site" style="background-color: #3b82f6; color: white; padding: 14px 28px; text-decoration: none; border-radius: 12px; font-weight: bold; display: inline-block;">Giriş Yap</a>
              </div>
              <hr style="margin-top: 40px; border: 0; border-top: 1px solid #eee;" />
              <p style="text-align: center; font-size: 12px; color: #999;">Bu maili siz talep etmediyseniz lütfen dikkate almayınız.</p>
            </div>
          </div>
        ` 
        // 2. Senaryo: Eğer rapor hazırsa
        : isReport 
          ? `
            <div style="font-family: sans-serif; padding: 20px;">
              <h1>Sayın ${firstName},</h1>
              <p>Satın aldığınız analiz raporu tamamlandı. Hesabınıza giriş yaparak raporunuzu detaylı inceleyebilirsiniz.</p>
              <br/>
              <a href="https://www.carvix.site/profile" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Profilime Git</a>
            </div>
          ` 
          : undefined,
      
      // 3. Senaryo: Sadece yeni kayıt (Hoşgeldin) ise React componentini kullan
      react: (!customMessage && !isReport) ? WelcomeEmail({ firstName }) : undefined,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Mail Gönderim Hatası:", error);
    return NextResponse.json({ success: false, error: "Mail gönderilemedi" }, { status: 500 });
  }
}