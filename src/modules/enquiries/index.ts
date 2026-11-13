import { EnquiryRepository } from "./infrastructure/repositories/EnquiryRepository";

import {
    AddEnquiryUseCase,
    GetEnquiriesUseCase,
    UpdateEnquiryUseCase,
    DeleteEnquiryUseCase,
} from "./application/use-cases/EnquiryUseCases";

import { EnquiryController } from "./presentation/controllers/EnquiryController";
import { createEnquiriesRouter } from "./presentation/routes/enquiries.routes";

export interface EnquiriesModuleDependencies {
    enquiryRepository?: EnquiryRepository;
}

export function initEnquiriesModule(deps?: EnquiriesModuleDependencies) {
    const enquiryRepository = deps?.enquiryRepository ?? new EnquiryRepository();

    const addEnquiryUseCase = new AddEnquiryUseCase(enquiryRepository);
    const getEnquiriesUseCase = new GetEnquiriesUseCase(enquiryRepository);
    const updateEnquiryUseCase = new UpdateEnquiryUseCase(enquiryRepository);
    const deleteEnquiryUseCase = new DeleteEnquiryUseCase(enquiryRepository);

    const enquiryController = new EnquiryController(
        addEnquiryUseCase,
        getEnquiriesUseCase,
        updateEnquiryUseCase,
        deleteEnquiryUseCase
    );

    const router = createEnquiriesRouter({ enquiryController });

    return {
        router,
        repositories: { enquiryRepository },
        controllers: { enquiryController },
        useCases: {
            addEnquiryUseCase,
            getEnquiriesUseCase,
            updateEnquiryUseCase,
            deleteEnquiryUseCase,
        },
    };
}
