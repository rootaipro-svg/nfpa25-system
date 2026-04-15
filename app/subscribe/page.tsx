'use client'
import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { createClient } from '@supabase/supabase-js';

export default function SubscribePage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // مفاتيح قاعدة بياناتك
    const supabaseUrl = 'https://uysfhchahbayozbisppy.supabase.co';
    const supabaseKey = 'sb_publishable_T03nYMwpGp1uXXTPLqx_1Q_JnzMuqML';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 🔴 هام جداً: استبدل هذه المفاتيح بمفاتيح حسابك في PayPal
    const PAYPAL_CLIENT_ID = "ضع_هنا_معرف_العميل_CLIENT_ID_من_بيبال";
    const PAYPAL_PLAN_ID = "ضع_هنا_رقم_خطة_الاشتراك_PLAN_ID_من_بيبال";

    const handleApprove = async (data: any, actions: any) => {
        setLoading(true);
        try {
            // حفظ عملية الدفع في قاعدة البيانات
            const { error } = await supabase.from('digital_subscriptions').insert([{ 
                user_email: email, 
                plan_name: 'الاشتراك المميز - Premium',
                paypal_subscription_id: data.subscriptionID,
                status: 'ACTIVE'
            }]);

            if (error) throw error;
            setIsSuccess(true);
        } catch (err) {
            alert("حدث خطأ أثناء تسجيل الاشتراك في قاعدة البيانات.");
        }
        setLoading(false);
    };

    if (isSuccess) {
        return (
            <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial', direction: 'rtl' }}>
                <h1 style={{ color: 'green' }}>🎉 تم تفعيل اشتراكك بنجاح!</h1>
                <p>شكراً لك. تم تسجيل إيميلك ({email}) ويمكنك الآن الوصول للمنتجات الرقمية.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '40px 20px', fontFamily: 'Arial', direction: 'rtl', backgroundColor: '#f4f7f6', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            
            <div style={{ background: '#fff', padding: '40px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', maxWidth: '450px', width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h2 style={{ color: '#333', margin: '0 0 10px 0' }}>الاشتراك الماسي 💎</h2>
                    <p style={{ color: '#666', margin: 0 }}>احصل على وصول كامل لجميع المنتجات الرقمية والتحديثات المستمرة.</p>
                    <h1 style={{ color: '#0066cc', marginTop: '15px' }}>$19.99 <span style={{ fontSize: '16px', color: '#999' }}>/ شهرياً</span></h1>
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>البريد الإلكتروني (لاستلام المنتج):</label>
                    <input 
                        type="email" 
                        required 
                        placeholder="example@gmail.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px', boxSizing: 'border-box' }}
                    />
                </div>

                {/* لن تظهر أزرار بيبال إلا إذا أدخل المستخدم إيميله */}
                {email.includes('@') ? (
                    <PayPalScriptProvider options={{ "clientId": PAYPAL_CLIENT_ID, vault: true, intent: "subscription" }}>
                        <PayPalButtons 
                            createSubscription={(data, actions) => {
                                return actions.subscription.create({
                                    plan_id: PAYPAL_PLAN_ID
                                });
                            }}
                            onApprove={handleApprove}
                            style={{ label: 'subscribe', color: 'blue', shape: 'pill' }}
                        />
                    </PayPalScriptProvider>
                ) : (
                    <div style={{ padding: '15px', background: '#ffebee', color: '#d32f2f', textAlign: 'center', borderRadius: '8px' }}>
                        الرجاء إدخال بريد إلكتروني صحيح لإظهار خيارات الدفع.
                    </div>
                )}

                {loading && <p style={{ textAlign: 'center', marginTop: '15px', color: '#666' }}>جاري تأكيد الاشتراك...</p>}
            </div>
            
        </div>
    );
}
