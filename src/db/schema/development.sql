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
(1, 'Ben talks'),
(1, 'Adam talks'),
(1, 'Intro'),
(1, 'Rehearsal');

INSERT INTO categories (user_id, name, color)
VALUES 
(1, 'Lighthouse', '#f44336'),
(1, 'Final project', '#3f51b5'),
(1, 'Demo day', '#9c27b0'),
(1, 'Party plans', '#00bcd4');

-- INSERT INTO entries (category_id)
-- VALUES
-- (1),
-- (2);

INSERT INTO entries (category_id, start_time, end_time, cumulative_pause_duration, intensity)
VALUES 
(3, '2020-01-28 09:22:00-08', '2020-01-28 09:26:00-08', 0, 1.00),
(3, '2020-01-28 09:14:00-08', '2020-01-28 09:19:00-08', 0, 1.00),
(4, '2020-01-27 20:11:00-08', '2020-01-27 20:58:00-08', 0, 1.00),
(1, '2020-01-27 19:40:00-08', '2020-01-27 20:00:00-08', 0, 1.00),
(3, '2020-01-27 11:20:09-08', '2020-01-27 13:02:44-08', 0, 1.00),
(3, '2020-01-27 08:30:19-08', '2020-01-27 11:06:34-08', 0, 1.00),
(1, '2020-01-21 11:00:00-08', '2020-01-21 12:30:00-08', 0, 0.90),
(1, '2020-01-19 10:42:00-08', '2020-01-19 14:05:00-08', 0, 1.00),
(1, '2020-01-19 09:00:00-08', '2020-01-19 10:18:00-08', 0, 0.90),
(1, '2020-01-18 18:20:09-08', '2020-01-18 21:14:20-08', 0, 1.00),
(2, '2020-01-12 20:35:00-08', '2020-01-12 21:30:00-08', 0, 1.00),
(1, '2020-01-12 19:45:41-08', '2020-01-12 20:30:45-08', 0, 1.00),
(2, '2020-01-03 19:00:00-08', '2020-01-03 19:40:00-08', 0, 1.00),
(2, '2020-01-03 16:30:00-08', '2020-01-03 18:30:00-08', 0, 0.80);

INSERT INTO entries_tags (entries_id, tag_id)
VALUES 
(1, 9),
(1, 6),
(2, 7),
(2, 10),
(4, 2),
(5, 10),
(6, 10),
(6, 9),
(7, 2),
(8, 2),
(8, 3),
(9, 2),
(10, 2),
(11, 3),
(12, 4),
(13, 1),
(14, 1);

INSERT INTO audio_alerts (name, file_name)
VALUES 
('Short Break', 'short_break.mp3'),
('Back to work', 'back_to_work.mp3'),
('Long Break', 'long_break.mp3'),
('Long Break over', 'long_break_over.mp3');

INSERT INTO timers (user_id, name, work, short_break, num_repeats, long_break, shortbr_start_audio_alert_id, shortbr_end_audio_alert_id, longbr_start_audio_alert_id, longbr_end_audio_alert_id)
VALUES 
(1, 'Classic pomodoro', 1500, 300, 4, 900, 1, 2, 3, 4),
(2, 'Eyesight saver', 1200, 20, 4, 600, 1, 2, 3, 4),
(2, 'The 52-17 one', 3120, 0, 1, 1020, 1, 2, 3, 4);
