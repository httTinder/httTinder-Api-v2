import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { AppError } from "../../../../errors/AppError";
import { IUserUpdateRelationReq } from "../../../../interfaces/user/user_profile/user_relationship";
import { typeOfRelationship } from "../../../../entities/user_profile/type_of_relationship";
import { userProfile } from "../../../../entities/user_profile";
import { IUserProfileUpdateRequest } from "../../../../interfaces/user/user_profile";

const updateRelationShip = async (
  relation: IUserUpdateRelationReq,
  id: string
): Promise<void> => {
  const userRepository = AppDataSource.getRepository(user);

  const profileRepository = AppDataSource.getRepository(userProfile);

  const relationRepository = AppDataSource.getRepository(typeOfRelationship);

  const { friendship, casual, serious } = relation;

  if (!friendship && !casual && !serious) {
    throw new AppError(404, "review required fields / one must be true");
  }

  if (
    !friendship === undefined &&
    !casual === undefined &&
    !serious === undefined
  ) {
    throw new AppError(400, "review required fields");
  }

  const findUser = await userRepository.findOneBy({ id });

  if (!findUser) {
    throw new AppError(404, "user not found");
  }

  const findProfile = await profileRepository.findOneBy({
    id: findUser?.profile?.id,
  });

  if (!findProfile) {
    throw new AppError(404, "create profile is required");
  }

  if (!findUser.profile.typeOfRelationship) {
    relationRepository.create(relation);

    relation = await relationRepository.save(relation);

    await profileRepository.update(findUser.profile.id, {
      typeOfRelationship: relation,
    });
    return;
  }

  await relationRepository.update(findUser.profile.typeOfRelationship.id, {
    ...relation,
  });

  return;
};

export default updateRelationShip;
