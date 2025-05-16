import { IKYC } from "@/interfaces";

export const kycList: IKYC[] = [
    {
        id: 'Bwoajf920jgD8i',
        status: 'ACTIVE',
        createdAt: '20-03-2024',
        docType: 'Valid ID',
        files: [
            {
                name: 'front',
                doc: '',
            },
            {
                name: 'back',
                doc: '',
            },
        ],
        updatedAt: '',
        expiryDate: '20-03-2024',
    },
    {
        id: 'Bwoajf920jeegD8i',
        status: 'PENDING',
        createdAt: '20-03-2024',
        docType: 'Proof of Address',
        files: [{
            name: 'File',
            doc: '',
        }],
        updatedAt: '',
        expiryDate: '20-03-2024',
    },
    {
        id: 'Bwoajf92ew0jgD8i',
        status: 'ACTIVE',
        createdAt: '20-03-2024',
        docType: 'Criminal Record Check',
        files: [{
            name: 'File',
            doc: '',
        }],
        updatedAt: '',
        expiryDate: '20-03-2024',
    },
]