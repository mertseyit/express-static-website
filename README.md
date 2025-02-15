# Kurumsal Web Uygulaması

Bu proje, Express.js ve EJS teknolojilerini kullanarak geliştirilmiş tam işlevsel bir kurumsal web uygulamasıdır. Hem kamuya açık sayfalara sahip hem de admin paneli üzerinden yönetilebilen güçlü özellikler sunar. Kullanıcılar, belirli içeriklere erişim sağlarken, yönetici kullanıcılar ise içerik ve siteyi yönetmek için özel paneli kullanabilirler.

![alt text](./readme/3.jpg)

## Kütüphaneler

Kullanılan kütüphaneleri `package.json` dosyasındaki `dependencies` içerisinde görebilirsiniz.

## Kurulum

### 1. .env Yapılandırması

Dosya dizininde ana dizinde `.env` dosyasını oluşturun ve `.env_exp` dosyasındaki verileri eksiksiz bir şekilde doldurun

### 2. Veri Tabanı

Bu projede PostgreSQL veri tabanı ve ORM yapısı olarak da Sequelize kütüphanesi kullanılmıştır. Eğer projeyi lokal makinenizde kullanmak istiyorsanız bilgisayarınızda Nodejs son sürümü (v20.16.0) ve PostgreSQL veri tabanı kurulu olması gerekmektedir. Kurulumları tamamladıktan sonra `sqls.sql` dosyasında yer alan SQL sorgusunu PostgreSQL içerisinde çalıştırabilirsiniz.

### 3. Projeyi Başlatma

Tüm kurulumları yaptıktan sonra `npm run dev` komutu ile projeyi başlatabilirsiniz.

<hr>

Profilimde yer alan iletişim bilgileri benimle iletişime geçebilirsiniz.
