import { Review } from "./reviews.model"


export async function getReviewsService(id: string) {
    if (!id) {
        return {
            statusCode: 400,
            data: {
                message: "Service id is required"
            }
        }
    }
    const reviews = await Review.findById(id)
    if (!reviews) {
        return {
            statusCode: 400,
            data: {
                message: "Reviews Not Exist"
            }
        }
    }

    return {
        statusCode: 200,
        data: {
            message: "Reviews fetched successfully",
            reviews
        }
    }
}

export async function addReviewsService(req: any) {
    const userId = req.user
    const { rating, comment } = req.body;
    const { id: serviceId } = req.paramsr.id;

    const review = await Review.create({
        data: {
            rating,
            comment,
            serviceId,
            userId,
        },
    });


    return {
        statusCode: 200,
        data: {
            message: 'add reviews successfully',
            review
        }
    }
}
export async function updateReviewsService(req: any) {

    const { id } = req.params
    const { rating, comment } = req.body
    const review = await Review.findByIdAndUpdate(id, {
        rating,
        comment,
    })
    return {
        statusCode: 200,
        data: {
            message: 'update reviews successfully',
            review
        }
    }
}
export async function deleteReviewsService(req: any) {
    const { id } = req.params

    const review = await Review.findById(id)

    if (!review) {
        return {
            statusCode: 404,
            data: {
                message: 'Review not found'
            }
        }
    }
    const newReview = await Review.findByIdAndDelete(id)
    return {
        statusCode: 200,
        data: {
            message: 'deleted reviews successfully',
            newReview
        }
    }
}