package br.com.gersis.loopback.modelo;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.strongloop.android.loopback.Model;
import com.strongloop.android.remoting.BeanUtil;
import org.json.JSONObject;


public class RespostaFormulario extends Model {


	private int valorResposta;
	private String emailBaby;
	private int perguntaFormularioId;
	// Relacionamentos 1
	private PerguntaFormulario PerguntaFormulario;
	private Baby Baby;
	// Relacionamentos N

	public void setId(Long id) {
		this.setIdObjeto(id);
	}
	public void setId(Integer id) {
		this.setIdObjeto(id);
	}

	public int getIdInteger() {
		return new Integer(getId().toString());
	}
	public long getIdLong() {
		return new Long(getId().toString());
	}

	public JSONObject getJSON() {
		JSONObject obj = new JSONObject();
		try {
			obj.put("id",getId());
			obj.put("valorResposta", valorResposta);
			obj.put("emailBaby", emailBaby);
			obj.put("perguntaFormularioId", perguntaFormularioId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}


	public void setValorResposta(int valor) { 
		this.valorResposta = valor;
	}
	public int getValorResposta() { 
		return this.valorResposta;
	}
	public void setEmailBaby(String valor) { 
		this.emailBaby = valor;
	}
	public String getEmailBaby() { 
		return this.emailBaby;
	}
	public void setPerguntaFormularioId(int valor) { 
		this.perguntaFormularioId = valor;
	}
	public int getPerguntaFormularioId() { 
		return this.perguntaFormularioId;
	}

	public PerguntaFormulario getPerguntaFormulario() {
		return PerguntaFormulario;
	}
	public void setPerguntaFormulario(HashMap valor) {
		this.PerguntaFormulario = new PerguntaFormulario();
		BeanUtil.setProperties(this.PerguntaFormulario, (Map<String, ? extends Object>) valor, true);
	}
	public Baby getBaby() {
		return Baby;
	}
	public void setBaby(HashMap valor) {
		this.Baby = new Baby();
		BeanUtil.setProperties(this.Baby, (Map<String, ? extends Object>) valor, true);
	}
}
