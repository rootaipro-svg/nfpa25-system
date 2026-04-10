import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { QRCodeCanvas } from 'qrcode.react';

export default function AddValve() {
    const [form, setForm] = useState({ number: '', type: 'OS&Y', location: '', zone: '' });
    const [qrUrl, setQrUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // 1. حفظ البيانات في Supabase
        const { data, error } = await supabase
            .from('fire_valves')
            .insert([{ 
                valve_number: form.number, 
                valve_type: form.type, 
                location_description: form.location, 
                zone_covered: form.zone 
            }])
            .select();

        if (error) {
            alert("خطأ في الحفظ: " + error.message);
        } else {
            // 2. توليد رابط الـ QR بناءً على المعرف (ID) الذي تم إنشاؤه
            const valveId = data[0].id;
            const fullUrl = `${window.location.origin}/inspect/${valveId}`;
            setQrUrl(fullUrl);
            alert("تم حفظ الصمام بنجاح وتوليد الكود!");
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '30px', fontFamily: 'Arial', direction: 'rtl', maxWidth: '500px', margin: 'auto' }}>
            <h2 style={{ color: '#d32f2f' }}>إضافة صمام حريق جديد (NFPA 25)</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input required placeholder="رقم الصمام (مثلاً: V-01)" style={{ padding: '10px' }} onChange={e => setForm({...form, number: e.target.value})} />
                <select style={{ padding: '10px' }} onChange={e => setForm({...form, type: e.target.value})}>
                    <option value="OS&Y">OS&Y (خارجي وبكرة)</option>
                    <option value="Butterfly">Butterfly (فراشة)</option>
                    <option value="PIV">PIV (مؤشر موقع)</option>
                </select>
                <input placeholder="الموقع (مثلاً: مستودع أ)" style={{ padding: '10px' }} onChange={e => setForm({...form, location: e.target.value})} />
                <input placeholder="المنطقة المغطاة" style={{ padding: '10px' }} onChange={e => setForm({...form, zone: e.target.value})} />
                <button type="submit" disabled={loading} style={{ padding: '15px', background: '#d32f2f', color: 'white', border: 'none', cursor: 'pointer' }}>
                    {loading ? 'جاري الحفظ...' : 'حفظ وتوليد QR Code'}
                </button>
            </form>

            {qrUrl && (
                <div style={{ marginTop: '30px', textAlign: 'center', border: '1px solid #ccc', padding: '20px' }}>
                    <h3>كود QR للصمام: {form.number}</h3>
                    <QRCodeCanvas value={qrUrl} size={200} />
                    <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>اطبع هذا الكود وضعه على الصمام</p>
                    <button onClick={() => window.print()} style={{ marginTop: '10px' }}>طباعة الكود</button>
                </div>
            )}
            <br />
            <a href="/">العودة للرئيسية</a>
        </div>
    );
}
