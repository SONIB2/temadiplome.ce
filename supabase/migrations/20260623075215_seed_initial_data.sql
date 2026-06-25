-- Seed services
INSERT INTO services (title, description, includes, price_note, icon, sort_order) VALUES
('Konsultim për temë diplome', 'Orientim profesional për zgjedhjen dhe zhvillimin e temës suaj të diplomës.', '["Sesion konsultimi 1-me-1", "Vlerësim i idesë suaj", "Këshilla për drejtim"]', 'Kërko ofertë', 'MessageSquare', 1),
('Zgjedhje teme diplome', 'Ju ndihmojmë të zgjidhni një temë aktuale, origjinale dhe relevante me fushën tuaj.', '["Propozim 3-5 temash", "Justifikim akademik", "Referenca fillestare"]', 'Kërko ofertë', 'Lightbulb', 2),
('Strukturim i kapitujve', 'Ndërtim i strukturës logjike të punimit sipas standardeve universitare.', '["Skicë kapitujsh", "Nëntituj", "Rrjedhë logjike"]', 'Kërko ofertë', 'ListTree', 3),
('Rishikim dhe redaktim akademik', 'Rishikim i plotë i përmbajtjes për cilësi, qartësi dhe koherencë akademike.', '["Redaktim gjuhe", "Komentet në anash", "Sugjerime përmirësimi"]', 'Kërko ofertë', 'FileEdit', 4),
('Formatim në Word sipas standardeve universitare', 'Formatim profesional i dokumentit në Word sipas udhëzimeve të universitetit.', '["Formatim fonti/madhësie", "Tituj e nëntituj", "Tabela e përmbajtjes"]', 'Kërko ofertë', 'FileType', 5),
('Referenca në APA style', 'Formatim i saktë i të gjitha referencave dhe citimeve në standardin APA.', '["Citime brenda tekstit", "Bibliografi APA", "Verifikim burimesh"]', 'Kërko ofertë', 'BookOpen', 6),
('Analizë statistikore SPSS / Excel', 'Analizë e të dhënave me SPSS ose Excel, përfshirë tabela dhe grafikë.', '["Përgatitje dataset", "Analiza statistikore", "Tabela dhe grafikë"]', 'Kërko ofertë', 'BarChart3', 7),
('Përgatitje PowerPoint për mbrojtje diplome', 'Prezantim profesional për mbrojtjen e diplomës.', '["Sllajde të strukturuara", "Design modern", "Shënime folësi"]', 'Kërko ofertë', 'Presentation', 8),
('Përkthim dhe përmirësim akademik', 'Përkthim dhe përmirësim i gjuhës akademike të punimit.', '["Përkthim profesional", "Përmirësim stili", "Korrekturë gjuhësore"]', 'Kërko ofertë', 'Languages', 9),
('Kontroll plagjiature', 'Verifikim i origjinalitetit të punimit me softuer specializ.', '["Raport i detajuar", "Similiritet %", "Sugjerime për ribërje"]', 'Kërko ofertë', 'ShieldCheck', 10),
('Konsultim online 1 me 1', 'Sesion online individual për çdo pyetje lidhur me punimin tuaj.', '["45 minuta konsultim", "Video call", "Përfundim me email"]', '2.500 L / sesion', 'Video', 11);

-- Seed packages
INSERT INTO packages (name, price_cents, features, is_popular, sort_order) VALUES
('Basic', 4900, '["Konsultim për strukturën", "Sugjerim teme", "Udhëzime fillestare"]', false, 1),
('Standard', 9900, '["Rishikim materiali", "Formatim", "Referenca APA", "Sugjerime për përmirësim"]', true, 2),
('Premium', 19900, '["Konsultim i plotë", "Analizë statistikore", "PowerPoint për mbrojtje", "Kontroll përfundimtar i dokumentit"]', false, 3);

-- Seed course
INSERT INTO courses (title, description, contents, benefits, price_cents, image_url, file_url) VALUES
('Kurs Praktik PDF: Si të realizosh vetë një temë diplome nga fillimi në fund',
'Ky kurs është krijuar për studentët që duan të mësojnë vetë si të ndërtojnë një temë diplome në mënyrë të qartë, të strukturuar dhe akademike. Brenda kursit do të gjeni udhëzime hap pas hapi për zgjedhjen e temës, ndërtimin e kapitujve, metodologjinë, analizën e të dhënave, citimet, referencat dhe përgatitjen për mbrojtjen.',
'["Si zgjidhet një temë diplome", "Si ndërtohet struktura e punimit", "Si shkruhet hyrja", "Si shkruhet rishikimi i literaturës", "Si vendosen referencat në APA style", "Si ndërtohet metodologjia", "Si përgatitet pyetësori", "Si interpretohen rezultatet", "Si bëhen tabela dhe grafikë", "Si shkruhen diskutimet", "Si shkruhen konkluzionet dhe rekomandimet", "Si përgatitet PowerPoint për mbrojtje", "Gabimet më të shpeshta që duhen shmangur"]',
'["Mëso në ritmin tënd - anytime, anywhere", "Ndjek hapa të qarta praktikë", "Kurs i përshtatur për standardet universitare", "Rishto dhe shiko sa herë të duash"]',
2900,
'https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=800',
NULL);

-- Seed testimonials
INSERT INTO testimonials (student_name, university, rating, message, sort_order) VALUES
('Era Hoxha', 'Universiteti i Tiranës', 5, 'Ndihma që mora për strukturimin e kapitujve ishte fantastike. Më ndihmoi të kuptoj se si duhet të rrjedhë një punim diplome.', 1),
('Klodian Marku', 'Universiteti Politeknik', 5, 'Kursi PDF është një burim i vyer. E përdora si udhërrëfyes për të gjithë procesin.', 2),
('Anila Berisha', 'UT - Fakulteti i Drejtësisë', 5, 'Konsultimi për referencat APA më shpëtoi shumë kohë. Shumë profesionale!', 3),
('Genti Rama', 'Universiteti i Durrësit', 5, 'Analiza statistikore me SPSS ishte e shkëlqyer. Rezultatet u prezantuan qartë.', 4);

-- Seed FAQ
INSERT INTO faq (question, answer, sort_order) VALUES
('Si mund ta porosis një shërbim?', 'Shkoni te seksioni Shërbimet ose Zgjidh Punimin, plotësoni formën me detajet e kërkesës suaj dhe ekipi ynë do t''ju kontaktojë brenda 24 orëve.', 1),
('A mund të blej vetëm kursin PDF?', 'Po, kursi PDF mund të blihet veçmas nga faqja e Kursit. Pas pagesës merrni linkun e shkarkimit dhe email konfirmimi.', 2),
('Si e marr PDF-në pas pagesës?', 'Menjëherë pas konfirmimit të pagesës, ju do të merrni një email me linkun e shkarkimit. Mund ta shkarkoni në çdo kohë.', 3),
('A ofroni konsultime online?', 'Po, ofrojmë konsultime online 1-me-1 përmes video call. Mund ta rezervoni nga seksioni i shërbimeve.', 4),
('A mund të më ndihmoni me formatimin dhe referencat?', 'Absolutisht. Formatimi në Word dhe referencat në APA janë dy nga shërbimet tona kryesore.', 5),
('A mund të dërgoj materialin tim për rishikim?', 'Po, në formën e porosisë mund të ngarkoni skedarët tuaj (Word, PDF, Excel, foto) për rishikim.', 6),
('Sa kohë zgjat përgjigjja?', 'Zakonisht ju kontaktojmë brenda 24 orëve nga dërgimi i kërkesës.', 7),
('A janë pagesat e sigurta?', 'Po, përdorim metoda pagese të sigurta për të gjitha transaksionet.', 8),
('A mund të kërkoj ofertë të personalizuar?', 'Po, plotësoni formën në Zgjidh Punimin me detajet dhe ne do t''ju dërgojmë një ofertë të personalizuar.', 9);

-- Seed blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, category, image_url) VALUES
('10 këshilla për të zgjedhur temën e diplomës', '10-kesdhilla-per-te-zgjedhur-temen-e-diplomes', 'Si të zgjidhni një temë që është aktuale, e realizueshme dhe e rëndësishme për fushën tuaj.',
'# 10 Këshilla për të zgjedhur temën e diplomës

Zgjedhja e temës është hapi më i rëndësishëm në procesin e punimit të diplomës. Ja disa këshilla:

1. **Zgjidhni diçka që ju pasionon** - do të kalojnië javë duke punuar me të.
2. **Konsultohuni me mentorin** - ai mund t''ju drejtojë.
3. **Kontrolloni literaturaën** - a ka mjaftueshëm burime?
4. **Bëjeni specifiken** - temat e gjera janë vështirë për tu trajtuar.

...',
'Këshilla', 'https://images.pexels.com/photos/6146079/pexels-photo-6146079.jpeg?auto=compress&cs=tinysrgb&w=800'),
('Si të shkruani referenca në APA style', 'si-te-shkruani-referenca-ne-apa-style', 'Një përshkrim i shkurtër i rregullave APA për citime dhe bibliografi.',
'# Referencat në APA style

Standardi APA është një nga më të përdorurëm në botën akademike. Ja bazat:

## Citimi brenda tekstit
P.sh. (Hoxha, 2023) ose (Hoxha & Marku, 2023, p. 45)

## Bibliografia
Hoxha, E. (2023). *Title italic*. Botuesi.

...',
'Këshilla', 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=800');
