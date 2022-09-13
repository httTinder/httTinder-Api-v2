import AppDataSource from "../../../data-source";
import { user } from "../../../entities";
import { userProfile } from "../../../entities/user_profile";
import { AppError } from "../../../errors/AppError";
import { IUserProfileUpdateRequest } from "../../../interfaces/user/user_profile";
import VerifyBadWords from "../../../utils/badWords.utils";
import VerifyProfission from "../../../utils/professionsList.utils";

const updateUserProfileService = async (
  userData: IUserProfileUpdateRequest,
  id: string
) => {
  const {
    orientation,
    gender,
    bio,
    height,
    profileImage,
    education,
    profession,
  } = userData;

  if (!orientation && !gender) {
    throw new AppError(400, "gender and orientation are required fields");
  }

  const regexOrientation = /^Homem$|^Mulher$|^Homem[/]Mulher$/;

  if (!regexOrientation.test(userData?.orientation)) {
    throw new AppError(400, "Review required fields of orientation");
  }

  if (!regexOrientation.test(userData?.gender)) {
    throw new AppError(400, "Review required fields of gender");
  }

  const parseHeight = Number(height);

  if (parseHeight === NaN) {
    throw new AppError(400, "Review required fields of height");
  }

  if (parseHeight > 251 && parseHeight < 59) {
    throw new AppError(400, "Review required range of height");
  }

  const regexEducation =
    /^Ensino Medio Incompleto$|^Ensino Medio Completo$|^Ensino Superior Incompleto$|^Ensino Superior Completo$|/;

  if (education !== undefined && !regexEducation.test(education)) {
    throw new AppError(400, "Review required education");
  }

  if (profession !== undefined && VerifyProfission(profession)) {
    throw new AppError(400, "Review the list of validated professions");
  }

  if (bio !== undefined && VerifyBadWords(bio)) {
    throw new AppError(
      400,
      "Review the list of prohibited bad words in the bio"
    );
  }

  const userRepository = AppDataSource.getRepository(user);

  const findUser = await userRepository.findOneBy({ id });

  if (!findUser) {
    throw new AppError(404, "user not found");
  }

  const profileRepositoy = AppDataSource.getRepository(userProfile);

  if (!findUser.profile) {
    profileRepositoy.create(userData);

    userData = await profileRepositoy.save(userData);

    userRepository.update(findUser.id, { profile: userData });

    return;
  }

  profileRepositoy.update(findUser.profile.id, { ...userData });

  return;
};

export default updateUserProfileService;
