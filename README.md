# myAdminPanelNextJSWithFastifyApi
Admin Panel Using Next JS For Fastify Api

Things to do:
- cikis yap diyince session hatasi aliniyor
- pagelerde componentsi sadece super admin ekleyebilsin.
- sweet alertleri toast olarak degistir
- post listlerdeki categoriler alt alta geliyor onlari yan yana duzenli guizel gozukecek sekilde ayarla
- elementId olanlari key olarak guncelle
- settings contact formu guncelle componentlerden(is editing yerine selectedelement falan kullan)
- rich textboxdaki buglari hallet (font color, edit image size, vs.)
- websitenin urllerini dynamic yapmak icin panelden duzenlettir (ornek olarak blog urli her dilde farkli olsun)
- urunler varyasyonlari icin farkli bir yol bul (ornek tum urun varyasyonlari aslinda urun olmali fakat urunun icine cekildiginde varyasyon olmali yada urun ekleme yerinde urun tipi olmali varyasyon yada urun diye)
- Yaptigin tum guncellemelerin hata kontrolunu yap
- Diller icin export import yap

+ components modelini tekrar ekle
+ default language id yi dillerden ayarla ayarlar sayfasiyla baglantisi olmasin birde sadece super admin ayarlasin
+ resim yukleyince listeye gelmiyor
+ kullanici resim silemiyor
+ editlemeye basinca (user) editlenecek isim gozukmuyor
+ user list sayfasinda kullanici silince tablo yenilenmiyor
+ lock sayfasinda sifre girdikten sonra sayfa yenilenmesin
+ cikis yapinca session hatasi aliyoruz
+ service get one larin hepsini get withId yap
+ user icin sayfada islem yaparken status yada ban control yap (ayni zamanda isim ve yetki kontrolude dahil. bunlar admin tarafindan guncellendiginde userdada guncel olmali)
+ yetkileri kontrol et
+ apiye get ile gonderdigin array datalar data[]= seklinde gidiyor onlari data= olarak duzenle
+ assets klasorunu yeni yapiya gore tekrar duzenle
+ gallery listteki resimler gelirken preloader calistir
+ lock sayfasinda session olmadigi icinlogin sayfasina atiyor onu duzenle
+ lock sayfasini hangi sayfada lock yaptiysam onun onune getirsin ve lock sayfasi kapandiginda kaldigim yerden devam edeyim
+ object export defaultlari export yap ve buyuk harfle baslat (ornek AuthService yerine AuthService)
+ tum dosyalarinda export defaultlari export olarak duzenle ve artik constlar gibi degerleri buyuk harflerle baslatarak cekme zorunlulugu yap (opsiyonel)
+ tum interfacelerdeki Document ekini sil onun yerine I kullan basinda
+ yeni permission sistemini yap apidekine benzer olsun
+ yeni end point sistemini yap
