import AppDataSource from "../../../data-source";
import { user } from "../../../entities";
import { userProfile } from "../../../entities/user_profile";
import { lookingFor } from "../../../entities/user_profile/looking_for";
import { typeOfRelationship } from "../../../entities/user_profile/type_of_relationship";
import { userImages } from "../../../entities/user_profile/user_images";
import { AppError } from "../../../errors/AppError";

const userDeleteProfileService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(user);

  const profileRepository = AppDataSource.getRepository(userProfile);

  const lookForRepository = AppDataSource.getRepository(lookingFor);

  const relationshipRepository =
    AppDataSource.getRepository(typeOfRelationship);

  const imagesRepository = AppDataSource.getRepository(userImages);

  const userFind = await userRepository.findOneBy({ id });

  if (!userFind) {
    throw new AppError(404, "User not found");
  }

  if (!userFind.profile) {
    throw new AppError(404, "User profile not found");
  }

  if (userFind.profile.lookingFor.id !== null) {
    await lookForRepository.delete({ id: userFind.profile.lookingFor.id });
  }

  if (userFind.profile.typeOfRelationship.id !== null) {
    await relationshipRepository.delete({
      id: userFind.profile.typeOfRelationship.id,
    });
  }

  // const findImages = await imagesRepository.find();

  // findImages.forEach(async (img) => {
  //   if (img.userProfile.id === userFind.profile.id) {
  //     await imagesRepository.delete({ id: img.id });
  //   }
  // });

  await profileRepository.delete({ id: userFind.profile.id });

  return;
};

export default userDeleteProfileService;
