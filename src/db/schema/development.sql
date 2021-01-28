INSERT INTO users (username, email, password)
VALUES 
('aaa', 'aaa@gmail.com', 'aaa'),
('bbb', 'bbb@gmail.com', 'bbb'),
('ccc', 'ccc@gmail.com', 'ccc');

INSERT INTO tags (user_id, tag)
VALUES 
(1, 'mockup'),
(1, 'features'),
(1, 'database'),
(1, 'compass'),
(1, 'no mistakes'),
(1, 'mistakes allowed'),
(1, 'Ben talks');
(1, 'Erica talks');
(1, 'Intro');
(1, 'Rehearsal');

INSERT INTO categories (user_id, name, color)
VALUES 
(1, 'Lighthouse', '#f44336'),
(1, 'Final project', '#3f51b5');
(1, 'Demo day', '#9c27b0'),
(1, 'Post LHL party planning', '#00bcd4');

INSERT INTO entries (category_id)
VALUES
(1),
(2);

INSERT INTO entries (category_id, description, start_time, end_time, cumulative_pause_duration, intensity)
VALUES 
(4, '', '2020-01-27 20:11:00+00', '2020-01-27 20:58:00+00', 0, 1.00);
(1, '', '2020-01-27 19:40:00+00', '2020-01-27 20:00:00+00', 0, 1.00);
(3, '', '2020-01-27 11:20:09+00', '2020-01-27 01:02:44+00', 0, 1.00);
(3, '', '2020-01-27 08:30:19+00', '2020-01-27 11:06:34+00', 0, 1.00);

(2, '', '2020-01-20 20:35:00+00', '2020-01-20 21:30:00+00', 0, 1.00);
(1, '', '2020-01-20 19:45:41+00', '2020-01-20 20:30:45+00', 0, 1.00);
(1, '', '2020-01-03 19:00:00+00', '2020-01-01 19:40:00+00', 0, 1.00);
(1, '', '2020-01-03 16:30:00+00', '2020-01-01 18:30:00+00', 0, 0.8);

(1, '', '2020-12-31 11:00:00+00', '2020-12-31 12:30:00+00', 0, 0.9);
(1, '', '2020-12-29 10:42:00+00', '2020-12-29 14:05:00+00', 0, 1.00);
(1, '', '2020-12-29 09:00:00+00', '2020-12-29 10:18:00+00', 0, 0.9);
(1, '', '2020-12-28 18:20:09+00', '2020-12-28 21:14:20+00', 0, 1.00);

(4, '', '2020-01-28 09:22:00+00', '2020-01-28 09:23:00+00', 0, 1.00);
(4, '', '2020-01-28 09:14:00+00', '2020-01-28 09:16:00+00', 0, 1.00);

INSERT INTO entries_tags (tag_id, entries_id)
VALUES 
(2, 1);
(2, 2);
(10, 3);
(5, 4);

(9, 5);
(4, 6);
(1, 7);
(1, 8);

(1, 9);
(1, 10);
(2, 11);
(2, 12);

(9, 13);
(6, 13);
(10, 14);

INSERT INTO audio_alerts (name, file_name)
VALUES 
('Short Break', 'short_break.mp3'),
('Back to work', 'back_to_work.mp3'),
('Long Break', 'long_break.mp3'),
('Long Break over', 'long_break_over.mp3');

INSERT INTO timers (user_id, name, work, short_break, num_repeats, long_break, shortbr_start_audio_alert_id, shortbr_end_audio_alert_id, longbr_start_audio_alert_id, longbr_end_audio_alert_id)
VALUES 
(1, 'Classic pomodoro', 1500, 300, 4, 900, 1, 2, 3, 4),
(2, 'Eyesight saver', 1200, 20, 4, 600, 1, 2, 3, 4);
(2, 'The 52-17 one', 3120, 0, 1, 1020, 1, 2, 3, 4);

-- INSERT INTO timers (user_id, name, work, short_break, num_repeats, long_break)
-- VALUES 
-- (3, 'Classic Pomodoro', 1500, 300, 4, 900);
