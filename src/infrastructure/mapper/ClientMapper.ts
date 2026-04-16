

import { IClientDocument } from "../database/mongoose/types/IClientDocument";
import { Client } from "../../domain/entities/Client";

export class ClientMapper {
  static toEntity(doc: IClientDocument) {
    return new Client(
      doc._id.toString(),
      doc.gymId,
      doc.email,
      doc.password ?? null,
      doc.profileUrl ?? null,
      doc.fullName,
      doc.phoneNumber,
      doc.dateOfBirth ?? null,
      doc.emergencyContact ?? null,
      doc.contactPerson ?? null,
      doc.isEmailVerified,
      doc.joinedDate,
      doc.isDeleted,
      doc.clientId ?? null,
      doc.height ?? null,
      doc.weight ?? null,
      doc.gender ?? null
    );
  }

  /**
   * for create new docs 
   * @param entity 
   * @returns 
   */

  static toDocument(entity: Client): Partial<IClientDocument> {
    const doc: Partial<IClientDocument> = {};

    if (entity.email) doc.email = entity.email;
    if (entity.contactPerson) doc.contactPerson = entity.contactPerson;
    if (entity.dateOfBirth) doc.dateOfBirth = entity.dateOfBirth;
    if (entity.emergencyContact) doc.emergencyContact = entity.emergencyContact;
    if (entity.fullName) doc.fullName = entity.fullName;
    if (entity.gymId) doc.gymId = entity.gymId;
    if (entity.isDeleted !== undefined) doc.isDeleted = entity.isDeleted;
    if (entity.isEmailVerified !== undefined) doc.isEmailVerified = entity.isEmailVerified;
    if (entity.joinedDate) doc.joinedDate = entity.joinedDate;
    if (entity.profileUrl) doc.profileUrl = entity.profileUrl;
    if (entity.phoneNumber) doc.phoneNumber = entity.phoneNumber;
    if (entity.password) doc.password = entity.password;
    if (entity.clientId) doc.clientId = entity.clientId;
    if (entity.height !== null && entity.height !== undefined) doc.height = entity.height;
    if (entity.weight !== null && entity.weight !== undefined) doc.weight = entity.weight;
    if (entity.gender) doc.gender = entity.gender;

    return doc;

  }

}