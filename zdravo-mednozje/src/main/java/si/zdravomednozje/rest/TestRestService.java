package si.zdravomednozje.rest;

import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.ManyToOne;
import javax.persistence.Query;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import si.zdravomednozje.model.Answer;
import si.zdravomednozje.model.Dependency;
import si.zdravomednozje.model.Question;
import si.zdravomednozje.util.Resource;


@Path("/testRest")
public class TestRestService {
	@Inject EntityManager entityManager;

	@GET		
	//@Produces("application/json")
	@Produces(MediaType.APPLICATION_JSON)
	@Path("randomNumber")
	
	public Response getRandomNumber(){
		return Response.ok("{\"numberR\":\"" + Math.random() + "\"}").build();
	}

	private static class ManyToOneAnnotationExclusionStrategy implements ExclusionStrategy {
		public boolean shouldSkipClass(Class<?> clazz) {
			return clazz.getAnnotation(ManyToOne.class) != null;
		}

		public boolean shouldSkipField(FieldAttributes f) {
			return f.getAnnotation(ManyToOne.class) != null;
		}
	}
	@GET		
	@Produces(MediaType.APPLICATION_JSON)
	@Path("questions")
	public Response getQuestionsFromDatabase(){
		entityManager = Resource.getEntityManager();
		Query query = entityManager.createQuery("FROM si.zdravomednozje.model.Question");
		ExclusionStrategy excludeManyToOne = new ManyToOneAnnotationExclusionStrategy();
		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.setDateFormat("HH:mm:ss.SSS dd-MM-yyyy")
			.setExclusionStrategies(excludeManyToOne);
		Gson gson = gsonBuilder.create();

		String response = gson.toJson(query.getResultList());
		entityManager.close();
		return Response.ok(response).build();
	}
/*	public String toJSONString(List<Question> questions){
		for (int i = 0; i < questions.size(); i++) {
			Question question = questions.get(i);
			JSONresponse += "{\n";
			
			JSONresponse += "\"id\":\""+ question.getId() +"\",";
			JSONresponse += "\"sequence\":\""+ question.getSequence() +"\",";
			JSONresponse += "\"text\":\""+ question.getText() +"\",";
			JSONresponse += "\"type\":\""+ question.getType() +"\",";
			
			// Answers
			JSONresponse += "\"answers\":[" ;
			for (int j = 0; j < question.getAnswers().size(); j++) {
				Answer answer = question.getAnswers().get(j);
				JSONresponse += "{";
				JSONresponse += "\"answerID\":\""+ answer.getAnswerID() +"\",";
				JSONresponse += "\"text\":\""+ answer.getAnswerText() +"\"";
				
				JSONresponse += "}";
				if(j < question.getAnswers().size()-1){
					JSONresponse += ",";
				}
			}
			JSONresponse += "],";
			
			// Dependencies
			JSONresponse += "\"dependencies\":[" ;
			for(int k = 0; k < question.getDependencies().size(); k++){
				Dependency dependency = question.getDependencies().get(k);
				JSONresponse += "{";
				JSONresponse += "\"previusQuestionID\":\""+ dependency.getPreviusQuestionID() +"\",";
				JSONresponse += "\"answerID\":\""+ dependency.getAnswerID() +"\"";
				
				JSONresponse += "}";
				if(k < question.getDependencies().size()-1){
					JSONresponse += ",";
				}
			}
			JSONresponse += "]";
			
			JSONresponse += "}";
			if (i < questions.size()-1) {
				JSONresponse += ",\n";
			}
		}
		JSONresponse += "]";
		return JSONresponse;
	} */
}
