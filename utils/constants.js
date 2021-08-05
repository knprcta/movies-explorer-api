const dbURL = 'mongodb://localhost:27017/movexpdb';

const msgNotFoundRes = 'Запрашиваемый ресурс не найден';

const msgNotFoundMovies = 'Фильмы отсутствуют';
const msgNotFoundMovie = 'Запрашиваемый фильм не найден';
const msgForbiddenDel = 'Запрещено удалять чужие фильмы';
const msgSuccessDel = 'Фильм удалён';
const msgNoValidUrl = 'Некорректный URL';

const msgNotFoundUser = 'Пользователь по указанному ID не найден';
const msgConflictUser = 'Пользователь с данным EMAIL уже зарегистрирован';
const msgSuccessSignUp = 'Пользователь успешно зарегистрирован';
const msgUnauthorized = 'Необходима авторизация';
const msgNoValidEmail = 'Некорректный EMAIL';
const msgNoValidEmailOrPass = 'Неправильные EMAIL или пароль';

const msgDefaultErr = 'На сервере произошла ошибка';
const msgCelebrateErr = 'Переданы некорректные данные';
const msgTryLater = 'Попробуйте позже';

module.exports = {
  dbURL,
  msgNotFoundRes,
  msgNotFoundMovies,
  msgNotFoundMovie,
  msgForbiddenDel,
  msgSuccessDel,
  msgNoValidUrl,
  msgNotFoundUser,
  msgConflictUser,
  msgSuccessSignUp,
  msgUnauthorized,
  msgNoValidEmail,
  msgNoValidEmailOrPass,
  msgDefaultErr,
  msgCelebrateErr,
  msgTryLater,
};
