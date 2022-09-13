import AppDataSource from "../../../data-source";
import { user } from "../../../entities";
import { userAdditionalData } from "../../../entities/user_aditional_data";
import { AppError } from "../../../errors/AppError";
import { IUserAddDataRequest } from "../../../interfaces/user/user_additionalData";

export const userAdditionalDataService = async (
  data: IUserAddDataRequest,
  userId: string
) => {
  const { zodiac, drinker, smoker } = data;

  let { kids, kidsQnt } = data;

  if (
    zodiac === undefined &&
    drinker === undefined &&
    smoker === undefined &&
    kids === undefined &&
    kidsQnt === undefined
  ) {
    throw new AppError(400, "Review required fields, one field must be sended");
  }

  if (!kids) {
    kidsQnt = null;
  }

  const regexZodiac =
    /^Pisces$|^Aries$|^Taurus$|^Gemini$|^Cancer$|^Leo$|^Virgo$|^Libra$|^Scorpio$|^Sagittarius$|^Capricorn$|^Aquarius$/;

  if (zodiac !== undefined && regexZodiac.test(zodiac)) {
    throw new AppError(400, "Review required fields of zodiac");
  }

  if (zodiac !== undefined && zodiac.length > 11) {
    throw new AppError(400, "Review required fields of zodiac");
  }

  if (Number(kidsQnt) === NaN) {
    throw new AppError(400, "kidsQnt must be a number");
  }

  if (Number(kidsQnt) !== NaN) {
    kids = true;
  }

  const userRepository = AppDataSource.getRepository(user);

  const additionalDataRepository =
    AppDataSource.getRepository(userAdditionalData);

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new AppError(404, "User not found");
  }

  if (!findUser.userAdditionalData) {
    additionalDataRepository.create(data);

    data = await additionalDataRepository.save(data);

    userRepository.update(findUser.id, {
      userAdditionalData: data,
    });

    return;
  }

  additionalDataRepository.update(findUser.userAdditionalData.id, {
    kids,
    kidsQnt,
  });
  return true;
};
