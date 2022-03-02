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
