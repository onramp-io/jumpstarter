INSERT INTO public.user ("email", "uid", "bio", "firstName", "lastName")
    VALUES ('ssquarepants@krustycrab.com', 'q', 'i live in a pineapple under the sea', 'spongebob', 'squarepants');
INSERT INTO public.user ("email", "uid", "bio", "firstName", "lastName")
  VALUES ('pstar@sea.com', 'r', 'i live under a rock', 'patrick', 'star');
INSERT INTO public.user ("email", "uid", "bio", "firstName", "lastName")
    VALUES ('squdward@sea.com', 's', 'i like clarinets', 'squidward', 'something');
INSERT INTO public.user ("email", "uid", "bio", "firstName", "lastName")
    VALUES ('obama@usa.com', 't', 'i was a president', 'barrack', 'obama');
INSERT INTO public.user ("email", "uid", "bio", "firstName", "lastName")
    VALUES ('pran@test.com', 'w', 'hi', 'pran', 'mag');
INSERT INTO public.user ("email", "uid", "bio", "firstName", "lastName")
    VALUES ('idk@idk.com', 'y', 'idk what to write', 'idk', 'idk');
INSERT INTO public.user ("email", "uid", "bio", "firstName", "lastName")
    VALUES ('beyonce@music.com', 'u', 'im awesome', 'beyonce', 'knowles');
INSERT INTO public.user ("email", "uid", "bio", "firstName", "lastName")
    VALUES ('what@what.com', 'i', 'ok', 'ok', 'ok');
INSERT INTO public.user ("email", "uid", "bio", "firstName", "lastName")
    VALUES ('scheeks@sea.com', 'o', 'im a squirrel that lives under water', 'sandy', 'cheeks');
INSERT INTO public.user ("email", "uid", "bio", "firstName", "lastName")
    VALUES ('test', 'p', 'test', 'test', 'test');

INSERT INTO public.project ("title", "category", "description", "fundTiers", "currFundGoal", "launchDate")
    VALUES ('krabby patty', 'food', 'burger', Array[0,10,20,30], 0, '2004-10-19 10:23:54');
INSERT INTO public.project ("title", "category", "description", "fundTiers", "currFundGoal", "launchDate", "userId")
    VALUES ('hello', 'food', 'test', Array[0,10,20,30], 0, '2004-10-19 10:23:54', 1);
INSERT INTO public.project ("title", "category", "description", "fundTiers", "currFundGoal", "launchDate", "userId")
    VALUES ('something cool', 'test', 'test', Array[0,10,20,30], 0, '2004-10-19 10:23:54', 2);
INSERT INTO public.project ("title", "category", "description", "fundTiers", "currFundGoal", "launchDate", "userId")
    VALUES ('not sure', 'test', 'test', Array[0,10,20,30], 0, '2004-10-19 10:23:54', 3);
INSERT INTO public.project ("title", "category", "description", "fundTiers", "currFundGoal", "launchDate", "userId")
    VALUES ('help', 'test', 'im out of ideas', Array[0,10,20,30], 0, '2004-10-19 10:23:54', 3);
INSERT INTO public.project ("title", "category", "description", "fundTiers", "currFundGoal", "launchDate", "userId")
    VALUES ('cool shoes', 'test', 'shoes that are cool', Array[0,10,20,30], 0, '2004-10-19 10:23:54', 5);
INSERT INTO public.project ("title", "category", "description", "fundTiers", "currFundGoal", "launchDate", "userId")
    VALUES ('something', 'test', 'im not an entrepreneur', Array[0,10,20,30], 0, '2004-10-19 10:23:54', 5);
INSERT INTO public.project ("title", "category", "description", "fundTiers", "currFundGoal", "launchDate", "userId")
    VALUES ('sleep maker', 'test', 'make more sleep', Array[0,10,20,30], 0, '2004-10-19 10:23:54', 5);
INSERT INTO public.project ("title", "category", "description", "fundTiers", "currFundGoal", "launchDate", "userId")
    VALUES ('lala', 'lala', 'lala', Array[0,10,20,30], 0, '2004-10-19 10:23:54', 6);
INSERT INTO public.project ("title", "category", "description", "fundTiers", "currFundGoal", "launchDate", "userId")
    VALUES ('hey', 'hey', 'hey', Array[0,10,20,30], 0, '2004-10-19 10:23:54', 6);

INSERT INTO public.category ("category", "picture")
    VALUES ('Arts', 'none');
INSERT INTO public.category ("category", "picture")
    VALUES ('Design & Tech', 'none');
INSERT INTO public.category ("category", "picture")
    VALUES ('Film', 'none');
INSERT INTO public.category ("category", "picture")
    VALUES ('Food & Craft', 'none');
INSERT INTO public.category ("category", "picture")
    VALUES ('Games', 'none');
INSERT INTO public.category ("category", "picture")
    VALUES ('Music', 'none');



UPDATE public.user SET "investedAmt" = 5000, "balance" = 10000 WHERE id = 34
UPDATE public.user SET "investedAmt" = 5000, "balance" = 10000 WHERE id = 35
UPDATE public.user SET "investedAmt" = 5000, "balance" = 10000 WHERE id = 36
UPDATE public.user SET "investedAmt" = 5000, "balance" = 10000 WHERE id = 37


INSERT INTO public.project ("title", "category", "description", "fundTiers", "currFundGoal", "launchDate", "likesAmt", "userId")
    VALUES ('MarsLink', 'Design & Tech', 'Marslink provides high-speed, low-latency broadband internet across Mars. Currently serving first-basis customers in Holden Crater.', Array[0,10,20,30], 20000, '2004-10-19 10:23:54', 100, 35);

INSERT INTO public.project ("title", "category", "description", "fundTiers", "currFundGoal", "launchDate", "likesAmt", "userId")
    VALUES ('ARK Invest 365', 'Design & Tech', 'Traveling to Mars? But still want to keep investing? Introducing ARK Invest 365, helps you invest during your interplanetary travles', Array[0,10,20,30], 20000, '2004-10-19 10:23:54', 100, 36);

INSERT INTO public.project ("title", "category", "description", "fundTiers", "currFundGoal", "launchDate", "likesAmt", "userId")
    VALUES ('Bitcoin Mars', 'Design & Tech', 'Bitcoin is an innovative payment network and a new kind of money, for Mars.', Array[0,10,20,30], 20000, '2004-10-19 10:23:54', 100, 37);


INSERT INTO public.investment ("fundAmt", "userId", "projectId")
    VALUES (5000, 34, 70);

INSERT INTO public.investment ("fundAmt", "userId", "projectId")
    VALUES (5000, 35, 70);

INSERT INTO public.investment ("fundAmt", "userId", "projectId")
    VALUES (5000, 36, 70);

INSERT INTO public.comment ("comment", "userId", "projectId")
    VALUES ('What a project! As Martian crypto grows, at Blend we will expand to support our friendly Martians with Bitcoin Mars. Wanna catch up for a quick chat, Satoshi?', 34, 70);

INSERT INTO public.comment ("comment", "userId", "projectId")
    VALUES ('Thanks, Satoshi! As the king of Mars, I hereby declare Bitcoin Mars to be the official currency of Mars. Satoshi, can we name it Marscoin?', 35, 70);

INSERT INTO public.comment ("comment", "userId", "projectId")
    VALUES ('Incredible!! Bitcoin Mars will help our interplanetary travelers invest so easily!', 36, 70);


-- Users
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Judy','Nottingam','jnottingam1@facebook.com',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @Timer','dYCvpGofZpUNEw7Luh1Vdqpkrdt2',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Mayor','Godfray','mgodfray2@twitter.com',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @Terraplanter','Mjqx0INK2GcyIOtIFjoQefEkLSz1',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Boote','Anthes','banthes3@unblog.fr',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @Sisyphus','WOnNBROjbKgTyryqfV3bym78XVc2',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Brooke','Penman','bpenman4@buzzfeed.com',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @MiniMuseum','gGWU2OIMsgStFcu12e50LMWe2Q83',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Denver','Hovel','dhovel5@paypal.com',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @Guweiz','h19PfAajbHOPqUCz2uYtBSBTlQB3',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Nappy','Fantonetti','nfantonetti6@gravatar.com',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @Sanctuary','wRDODAjV9jNvxQYtLvC7DYrUgVJ3',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Brigitte','Self','bself7@etsy.com',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @Frosthaven','k4cDhS0ntXOTz7kU8L1LFFH2NJG2',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Lorrie','McAlees','lmcalees8@arizona.edu',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @AvatarLegends','8df6fOoUWQZ4O3hpFHz0tMyt2wB3',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Corny','Croston','ccroston9@taobao.com',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @ExplodingKittens','vNdwmwjLg9XhhOLzNP66PKIeM782',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Melany','Shrimptone','mshrimptonea@archive.org',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @TheWitcher','DxfmyUbQnvdlmuu4Tp8xKoMAxv73',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Julietta','Fontell','jfontellb@fda.gov',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @NemesisLockdown','JPkt1y2By1dGecrrhOZiDaowbbh1',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Kelby','Plan','kplanc@merriam-webster.com',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @TheVeronicaMarsMovieProject','ofwVCUBppJdD5eGBg1MWUdo4L8w1',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Elijah','Illingsworth','eillingsworthd@nydailynews.com',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @CriticalRole','RvzzyahEZzRqIsW8bO9OiNTDTyr2',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Cello','Weller','cwellere@arstechnica.com',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @LMMMBTZ','7zoCy9cbcSas4WkNlr4cEOaeV7j1',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Davidson','Terren','dterrenf@google.de',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @BMS','FinPWELMvVRvl80ygsL9BmmeptN2',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Venus','Klimkin','vklimking@europa.eu',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @WTFIFZ','2nb1jysF3mM1wBUHitBFa6MOqkx1',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Broderic','Soan','bsoanh@wired.com',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @CoolestCooler','JY6hYzvG7UQ9p4iSjeH1AV6vXiP2',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Fanya','Baike','fbaikei@walmart.com',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @PicoC','76ra7zIuy9QuMszeb7bb20t1uBq2',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Karylin','Eglese','keglesej@nydailynews.com',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @PrepdPack','uC8kAwM54gbMzOcm3aIhuskiHQj2',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Dalia','Keedy','dkeedy0@angelfire.com',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @Silo','8pzaojrVrOeJscVTjNsNhMa14zG3',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Garrett,','Beckenham','gbeckenham1@youku.com',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @PrepdChefSkillet','mVgzGQr9WPQCjRbfrgYQNMeAllm2',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Gloriana','Mansuer','gmansuer2@home.pl',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @PebbleTime','ZJyRxnxuD6hUNNwqJTOX170eNdf2',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Cosme','Inett','cinett3@deviantart.com',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @EcoFlow','rlcYQI3XT1acU3wpntD9NWAZ78v1',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Laverne','Baversor','lbaversor4@bing.com',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @Snapmaker','EtFgNZQYaOZVjdpKhqERP3p75v13',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Jeno','Ramelot','jramelot5@shinystat.com',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @BirdBuddy','qT8ftk5RQKPfRG559Z9P0WBW9TF2',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Angil','Mayhew','amayhew6@youku.com',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @Pimax','o1sECPIfScSTBFqot8PFLF64MbE3',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Tybi','Barbrick','tbarbrick7@ehow.com',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'CEO @Voyager Golden Record','GyBWUqVSKvUQd2j1WRyD8dijCrG2',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Doy','Virr','dvirr8@bizjournals.com',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'Manager @Hatsune Miku Global Concert','8ZYfQw4Vc8RbB81xy9pIQ2BQ8o92',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Eydie','Courtenay','ecourtenay9@webeden.co.uk',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'Manager @De La Sou','AgCV8DeBCXWCdCz1fkaYRbG7oHZ2',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Sergent','Lawlee','slawleea@theglobeandmail.com',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'Manager @Theatre Is Evil','7GUDAHHZ3JfYX2hF5Qy9Kl1b4Zy1',0,0,NULL);
INSERT INTO public.user("firstName","lastName","email","interests","bio","uid","balance","investedAmt","avatar")  VALUES ('Zonnya','Fahey','zfaheya@stumbleupon.com',Array['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music'],'Manager @New Carman Album and Music Video','OVZTGWcDikh4Iw7uD61LgKZDJ262',0,0,NULL);

-- Projects
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'terraplanter - visibly follow the journey from seed to plant','Arts','Just fill with water and the plant will take only what it needs to visibly grow & flourish on the exterior surface of the planter.',Array[0,10,20,30],0,0,'2004-10-19 10:23:54',0,42,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'Sisyphus – The Kinetic Art Table','Arts','What music brings to your ears, Sisyphus brings to your eyes. Kinetic art, technology and design merged in stunning meditative beauty.',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,43,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'Mini Museum','Arts','Billions of years of life, science and history in the palm of your hand! Curated, handcrafted, and artfully arranged for display and wonder!',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,44,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'Guweiz: The Art of Gu Zheng Wei','Arts','Explore the intriguing, anime-inspired world of digital artist Gu Zheng Wei, also known as Guweiz.',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,45,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'Sanctuary: The Art Book of Yuumei','Arts','An art book showcasing a collection of my favorite paintings from the past decade. Missed the campaign? You can still get the artbook on YuumeiArt.com/shop in March 2021',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,46,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'Frosthaven','Games','Euro-inspired dungeon crawling sequel to the 2017 smash-hit board game Gloomhaven',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,47,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'Avatar Legends: The Roleplaying Game','Games','An officially licensed tabletop roleplaying game set in the world of Avatar: The Last Airbender and The Legend of Korra',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,48,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'Exploding Kittens','Games','This is a card game for people who are into kittens and explosions and laser beams and sometimes goats.',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,49,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'The Witcher: Old World','Games','Action-packed adventure board game, full of immersive choices and excitingly fresh mechanics.',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,50,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'Nemesis Lockdown','Games','Stand alone expansion to one of the biggest Board Game hit of recent years, Nemesis',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,51,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'The Veronica Mars Movie Project','Film','The Veronica Mars movie project faces the usual risks of film and TV production — what if Kristen Bell joins a cult bent on the destruction of visual media? What if gangland enforcers break Rob’s typing fingers? Never fear: we are offsetting those risks with production insurance, contingency plans, and a production team with decades of experience.',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,52,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'Critical Role: The Legend of Vox Machina Animated Special','Film','Critical Role''s The Legend of Vox Machina reunites your favorite heroes for a professional-quality animated special!Critical Role''s The Legend of Vox Machina reunites your favorite heroes for a professional-quality animated special!',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,53,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'Let''s Make More MST3K & Build The Gizmoplex!','Film','Together, let''s make more MYSTERY SCIENCE THEATER 3000 *without* a network + BUILD THE GIZMOPLEX, an online theater for live events!',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,54,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'Blue Mountain State: The Movie','Film','An epic, outrageous, feature length comedy based on the popular TV series.',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,55,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'WHO THE F*@% IS FRANK ZAPPA?','Film','Our Kickstarter has ended, but you''ll still be able to join us to help save the Vault & tell Frank''s story. Check back soon for more details!',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,56,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'Coolest Cooler: 21st Century Cooler that''s Actually Cooler','Food & Craft','The COOLEST is a portable party disguised as a cooler, bringing blended drinks, music and fun to any outdoor occasion.',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,57,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'Pico C - Craft Brewing For All','Food & Craft','Craft Beer Your Way - Easier, More Affordable, More Fun!',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,58,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'Prepd Pack - The Lunchbox Reimagined','Food & Craft','An intelligently designed, beautifully crafted lunchbox and smart recipe app: Get Prepd and kickstart your healthier lifestyle. Prepd Colors is now on Kickstarter',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,59,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'Silo: one-touch connected vacuum system for 5x fresher food','Food & Craft','Your new countertop staple. Lock in freshness and throw out less food. A smart base and patented containers system to deep-vacuum and seal food. Plus built-in Alexa to manage inventory.',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,60,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'Prepd Chef Skillet','Food & Craft','The Ultimate Everyday Cast Iron - Lighter, Smoother, and Naturally Non-Stick',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,61,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'Pebble Time - Awesome Smartwatch, No Compromises','Design & Tech','Color e-paper smartwatch with up to 7 days of battery and a new timeline interface that highlights what''s important in your day.',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,62,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'EcoFlow DELTA Pro: The Portable Home Battery','Design & Tech','Expandable capacity (3.6-25kWh) | Power almost anything (3.6-7.2kW) | Home battery ecosystem',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,63,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'Snapmaker 2.0: Modular 3-in-1 3D Printers','Design & Tech','Unlock your full creative potential from 3D printing to laser engraving, cutting and CNC carving. Smarter, larger, and more powerful.',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,64,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'Bird Buddy: A Smart Bird Feeder','Design & Tech','Bird Buddy notifies you of feathered visitors, captures their photos and organizes them in a beautiful collection!',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,65,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'Pimax: The World''s First 8K VR Headset','Design & Tech','Pimax 8K allows users to experience VR with Peripheral vision while solving the problem of screen door effect and motion sickness',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,66,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'The Voyager Golden Record','Music','Experience the historic interstellar message for extraterrestrials the way it was meant to be played. The Voyager Golden Record is now available from Ozma Records as a 3xLP Box Set and 2xCD-Book edition.',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,67,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'Hatsune Miku Global Concert “HATSUNE MIKU EXPO 2021 Online”','Music','Help us create an online show featuring virtual singer Hatsune Miku!',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,68,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'De La Soul','Music','Welcome 2 the magic made! The time is one year later: De La Soul''s latest album is in stores and available everywhere.',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,69,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'Theatre Is Evil: the album, art book and tour','Music','WE ARE THE MEDIA! With your backing, me & The Grand Theft Orchestra released "Theatre Is Evil" in September 2011, hit the billboard top 10, toured the world, played 25 house parties & made a MASSIVE book with album-inspired art from 30+ artists!',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,70,0,0,0);
INSERT INTO public.project("pictures","title","category","description","fundTiers","currFundGoal","fundRaised","launchDate","likesAmt","userId","views","trendScore","investors") VALUES (NULL,'New Carman Album and Music Video','Music','Carman fans get ready for a once in a lifetime chance to partner with him to make history with a new CD & Music Video project.',Array[0,10,20,30],0,0,'''2004-10-19 10:23:54''',0,71,0,0,0);
