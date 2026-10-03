# نظام الحسابات — Supabase Database + SMTP الخاص بك

هذا النظام **لا يستخدم Supabase لإرسال رسائل التفعيل**.

- **Supabase** = قاعدة البيانات فقط.
- **SMTP الذي تضع بياناته أنت** = إرسال رسائل تفعيل البريد وإعادة تعيين كلمة المرور.
- **API Server** = تسجيل الحساب، تشفير كلمات المرور، إصدار جلسات الدخول، والتحقق من روابط البريد.
- كلمة المرور لا تُحفظ كنص صريح؛ يتم تخزينها كـ bcrypt hash.

## 1) إنشاء قاعدة البيانات

افتح Supabase → SQL Editor وشغّل محتوى `supabase-schema.sql`.

## 2) إعداد متغيرات البيئة

انسخ `.env.example` إلى `.env`/Environment Variables في الاستضافة وضع:

```env
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
JWT_SECRET=ضع-قيمة-عشوائية-طويلة-وسرية

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASS=your-smtp-password
SMTP_FROM="Church History <your-email@example.com>"

APP_URL=https://your-domain.com
```

**مهم:** لا تضع `SUPABASE_SERVICE_ROLE_KEY` أو `SMTP_PASS` داخل `VITE_*` ولا داخل كود React. هذه القيم Server-only.

## 3) كيف تعمل العملية

### إنشاء الحساب
1. المستخدم يملأ الاسم + Gmail + كلمة المرور.
2. السيرفر يتحقق من البيانات ويعمل bcrypt لكلمة المرور.
3. يتم إنشاء سجل في Supabase.
4. يتم إنشاء verification token عشوائي وتخزين hash له فقط.
5. السيرفر يرسل رسالة من SMTP الذي حددته.

### تفعيل Gmail
المستخدم يضغط على الرابط الموجود في الرسالة:

`/verify-email?token=...`

السيرفر يتحقق من الـ token وصلاحيته ثم يجعل `email_verified=true`.

### تسجيل الدخول
لا يسمح بالدخول قبل تفعيل البريد.

### نسيت كلمة المرور
يرسل السيرفر رابط reset عبر SMTP نفسه، والـ token له صلاحية ساعة.

## 4) تشغيل المشروع

```bash
npm install
npm run dev
```

## 5) النشر على Vercel

أضف Environment Variables نفسها في Vercel. ملفات `api/*.js` تعمل كـ Serverless Functions.

اضبط:

`APP_URL=https://الدومين-النهائي-للموقع`

حتى تصل روابط التفعيل للمستخدم إلى الموقع الصحيح.

## 6) ملاحظات أمان

- لا تستخدم Service Role Key في Frontend.
- لا تخزن كلمات المرور مباشرة.
- verification/reset tokens لا يتم تخزينها كنص صريح في قاعدة البيانات.
- استخدم HTTPS في الإنتاج.
- استخدم SMTP provider يسمح بإرسال البريد من الدومين الصحيح، ويفضل إعداد SPF/DKIM/DMARC للدومين.

## Local diagnostics

When the backend starts, it automatically checks:

- required environment variables
- Supabase connectivity
- access to `public.users`
- SMTP connection/authentication

The terminal prints clear `[SUPABASE]`, `[SMTP]`, and `[CONFIG]` status lines. Secrets are never printed.

You can also open:

`http://localhost:3001/api/health`

This returns a safe JSON health report. It never returns Supabase keys, SMTP passwords, JWT secrets, or tokens.
